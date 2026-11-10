# Deploying to AWS (single EC2 host)

```
                 Route 53:  example.com, *.example.com  ->  Elastic IP
                                        │
                      EC2 t3.small (Ubuntu, Docker Compose)
   ┌────────────────────┬───────────────┴─────┬───────────────────┐
 nginx :443           web (puma)            sidekiq            postgres, redis
 React build +        /api, /login,         resume scoring     (containers,
 TLS + reverse proxy  /signup, /rails       jobs               named volumes)
                           └──────── S3 bucket (uploads) ───────┘
                       credentials come from the EC2 IAM role (no access keys)
```

Every company lives on its own subdomain (`5.example.com`), and the API is served from the
same host under `/api`, so Rails can read the tenant from the subdomain. That is why a real
domain with a wildcard record and a wildcard TLS certificate is required.

Region: **us-east-1**. Replace `example.com` everywhere below with your domain.

---

## 0. Protect the account (do this first)

1. **Billing → Budgets → Create budget** → "Monthly cost budget", $10, email alert. Add a second at $25.
   *Why:* the only way to find out you left something expensive running is an alert.
2. **IAM → root user → Assign MFA.**
3. Log the CLI in with your console session (no long-lived access keys):
   ```bash
   aws login --region us-east-1
   aws sts get-caller-identity   # should print your account id
   ```

## 1. Domain + DNS zone

**Route 53 → Registered domains → Register domains.** Choose a cheap TLD (two labels, e.g.
`yourname-jobs.click`). Route 53 creates the **hosted zone** for you; it costs $0.50/month.
Confirm the verification email AWS sends, or the domain is suspended after 15 days.

*Learn:* a hosted zone is the set of DNS records for your domain; the registrar points the
domain at Route 53's name servers (the `NS` record in the zone).

## 2. S3 bucket for uploads

**S3 → Create bucket** → name `jobs-portal-uploads-<something-unique>`, region us-east-1.
Keep **Block all public access ON** and default encryption on.

*Learn:* the bucket stays private. Rails hands the browser a short-lived **presigned URL**
when someone opens a resume, so no file is ever public.

## 3. IAM role for the EC2 instance

**IAM → Roles → Create role** → Trusted entity: *AWS service → EC2*. Skip the managed policies,
name it `jobs-portal-ec2`, create it, then **Add permissions → Create inline policy → JSON**:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Uploads",
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::BUCKET_NAME", "arn:aws:s3:::BUCKET_NAME/*"]
    },
    {
      "Sid": "CertbotDnsChallenge",
      "Effect": "Allow",
      "Action": ["route53:ListHostedZones", "route53:GetChange"],
      "Resource": "*"
    },
    {
      "Sid": "CertbotDnsRecords",
      "Effect": "Allow",
      "Action": "route53:ChangeResourceRecordSets",
      "Resource": "arn:aws:route53:::hostedzone/HOSTED_ZONE_ID"
    }
  ]
}
```

*Learn:* this is **least privilege**: the server can touch only its own bucket and its own DNS
zone. Because the role is attached to the instance, the AWS SDK fetches temporary credentials
from the instance metadata service and there are no keys to leak.

## 4. Security group

**EC2 → Security Groups → Create** `jobs-portal-web`:

| Type  | Port | Source    |
|-------|------|-----------|
| SSH   | 22   | My IP     |
| HTTP  | 80   | 0.0.0.0/0 |
| HTTPS | 443  | 0.0.0.0/0 |

Postgres and Redis are **not** opened. They are only reachable inside the Docker network.

## 5. Launch the instance

**EC2 → Launch instance**
- AMI: **Ubuntu Server 24.04 LTS** (x86_64)
- Type: **t3.small** (2 GB RAM; 1 GB is not enough for Rails + Sidekiq + Postgres + Redis)
- Key pair: create one, download the `.pem`
- Network: security group `jobs-portal-web`
- Storage: **30 GB gp3**
- Advanced details:
  - IAM instance profile: **jobs-portal-ec2**
  - Metadata version: **V2 only**, **Metadata response hop limit: 2**

> The hop limit matters: the default of 1 lets the host reach the metadata service but **not
> the containers** (Docker adds a network hop), and S3 uploads fail with "no credentials".

Then **EC2 → Elastic IPs → Allocate → Associate** with the instance, so the IP survives restarts.

## 6. DNS records

**Route 53 → Hosted zones → your domain → Create record**, twice:
- `A` record, name *(empty)*, value = Elastic IP
- `A` record, name `*`, value = Elastic IP

Check from your machine: `dig +short 5.example.com` should print the Elastic IP.

## 7. Prepare the server

```bash
chmod 400 ~/Downloads/jobs-portal.pem
ssh -i ~/Downloads/jobs-portal.pem ubuntu@<ELASTIC_IP>

# 2 GB swap: building the React bundle needs more memory than the box has free
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile && sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# Docker
sudo apt-get update && sudo apt-get install -y docker.io docker-compose-v2 git
sudo usermod -aG docker ubuntu && exit     # log out and back in so the group applies
```

```bash
ssh -i ~/Downloads/jobs-portal.pem ubuntu@<ELASTIC_IP>
git clone -b main https://github.com/faiq-ali24/jobs_portal_backend.git
git clone -b main https://github.com/faiq-ali24/job_portal_react.git
cd jobs_portal_backend/deploy
cp .env.example .env
nano .env
```

Fill in `.env`: `APP_DOMAIN`, `S3_BUCKET`, a strong `POSTGRES_PASSWORD` (and the same in
`DATABASE_URL`), and generate the two secrets:

```bash
openssl rand -hex 64   # SECRET_KEY_BASE
openssl rand -hex 64   # DEVISE_JWT_SECRET_KEY
```

## 8. TLS certificate (wildcard, Let's Encrypt)

```bash
docker compose run --rm certbot certonly --dns-route53 \
  -d example.com -d '*.example.com' \
  --agree-tos -m you@example.com --non-interactive
```

*Learn:* a wildcard certificate can only be issued with a **DNS-01 challenge**: certbot uses
the instance role to write a temporary `TXT` record in Route 53, proving you control the domain.

## 9. Start everything

```bash
docker compose up -d --build      # first build takes ~5-10 min
docker compose ps                 # all services "running"
docker compose logs -f web        # watch migrations and puma boot
```

Create the first admin account:

```bash
docker compose exec web bundle exec rails runner \
  'User.create!(name: "Admin", email: "admin@example.com", password: "a-strong-password", role: :admin)'
```

Open `https://example.com`, sign up a company, post a job, apply with a PDF resume, and check
that the match score appears (that proves Sidekiq, Redis and S3 all work).

## 10. Certificate renewal

Let's Encrypt certificates last 90 days. `crontab -e` and add:

```
0 3 * * 1 cd ~/jobs_portal_backend/deploy && docker compose run --rm certbot renew -q && docker compose exec nginx nginx -s reload
```

## Redeploying after a code change

```bash
cd ~/job_portal_react && git pull
cd ~/jobs_portal_backend && git pull
cd deploy && docker compose up -d --build
```

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| `nginx` keeps restarting | certificate missing: run step 8 first; `docker compose logs nginx` |
| Uploads fail, logs say "unable to sign request without credentials" | metadata hop limit is 1 (step 5), or role not attached |
| 403 "Blocked host" | `APP_DOMAIN` in `.env` doesn't match the domain you opened |
| Pages load but every API call is 401 after login | cookie domain: the frontend was built with a different `APP_DOMAIN`; rebuild |
| Build killed / exit 137 | out of memory: check the swap file (step 7) |

## Cost and cleanup

Roughly $15 (EC2) + $3.60 (public IPv4) + $0.50 (hosted zone) + cents for S3, about **$20/month**.
Stopping the instance stops the EC2 charge but not the Elastic IP charge. To tear down: terminate
the instance, release the Elastic IP, empty and delete the bucket, and delete the hosted zone.
