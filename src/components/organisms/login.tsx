import React, { useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

export interface UserLogin {
  email: string;
  password: string;
}

interface Company {
  id: number;
  name: string;
  subdomain: string;
}

interface LoginProps {
  companies: Company[];
  onSubmit: (data: UserLogin) => void;
}

const Login: React.FC<LoginProps> = ({ companies, onSubmit }) => {
  const [data, setData] = useState<UserLogin>({ email: "", password: "" });
  const hostParts = window.location.hostname.split(".");
  let subdomain: string = "";
  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub;
  }
  const [selectedSubdomain, setSelectedSubdomain] = useState<string>(subdomain);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubdomain = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setSelectedSubdomain(e.target.value);
    if (e.target.value === "") return;
    window.location.href = `http://${e.target.value}.lvh.me:3000/login`;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedSubdomain) {
      toast.error("Please select a company");
      return;
    }
    onSubmit(data);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <h2 className="text-center my-4">Welcome Back!</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="subdomain" className="form-label">
                Select Company
              </label>
              <select
                id="subdomain"
                className="form-select"
                value={subdomain}
                onChange={handleSubdomain}
              >
                <option value="">Choose a Company</option>
                {companies.map((c) => (
                  <option key={c.id} value={c.subdomain}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
