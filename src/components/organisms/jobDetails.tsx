import React from "react";
import { userProfile } from "../../interfaces/appInterface";
import { JobData } from "../../screens/jobsDetailsScreen";
import { UserModel } from "../templates/jobDetailsTemplate";

interface JobDetailsProps {
  job: JobData;
  user: UserModel | null;
  onDelete: () => void;
  onUpdate: () => void;
  onViewApplications: () => void;
  onApply: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({
  job,
  user,
  onDelete,
  onUpdate,
  onViewApplications,
  onApply,
}) => {
  const hostParts = window.location.hostname.split(".");
  let subdomain: string | null = null;
  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">
          <h3 className="card-title text-primary fw-bold">{job.title}</h3>
          <h5 className="text-muted mb-3">{job.companyName}</h5>
          <hr />

          <p className="mb-2">
            <strong className="text-dark">Location:</strong> {job.location}
          </p>
          <p className="mb-2">
            <strong className="text-dark"> Salary:</strong>{" "}
            <span className="badge bg-success fs-6">
              {job.salary.toLocaleString()} PKR
            </span>
          </p>
          <p className="mb-2">
            <strong className="text-dark">Description:</strong>{" "}
            {job.description}
          </p>

          {job.brochure && (
            <>
              <p className="mb-2">
                <strong className="text-dark">Job Details:</strong>{" "}
                {job.jobDescription}
              </p>
              <a
                href={`http://${subdomain}.lvh.me:3001${job.brochure}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary mt-3"
              >
                View Brochure
              </a>
            </>
          )}

          <div className="mt-4 d-flex flex-wrap gap-2">
            {(user?.role === "company" && user?.id === job.companyId) ||
            user?.role === "admin" ||
            user?.role === "company_manager" ? (
              <>
                <button className="btn btn-danger" onClick={onDelete}>
                  Delete
                </button>
                {user?.role === "company" && (
                  <button className="btn btn-success" onClick={onUpdate}>
                    Update
                  </button>
                )}
                <button
                  className="btn btn-info text-white"
                  onClick={onViewApplications}
                >
                  View Applications
                </button>
              </>
            ) : user?.role === "candidate" ? (
              <button className="btn btn-success" onClick={onApply}>
                Apply Now
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
