import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useUser } from "../../context/userContext";
import { ApplicantProps } from "../../screens/applicationDetailsScreen";
import { ApplicationDetailsProps } from "../templates/applicationDetailsTemplate";

const ApplicationDetails: React.FC<ApplicationDetailsProps> = ({
  jobId,
  id,
  applicant,
  onChangeStatus,
  onDelete,
}) => {
  const { user } = useUser();
  const navigate = useNavigate();

  const hostParts = window.location.hostname.split(".");
  let subdomain: string | null = null;
  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub;
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h3 className="card-title">{applicant?.name}</h3>
          <h5 className="text-muted">Status: {applicant?.status}</h5>
          <hr />

          <p className="mb-2">
            <strong>Age:</strong> {applicant?.age}
          </p>
          <p className="mb-2">
            <strong>Experience:</strong> {applicant?.yoe} years
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {applicant?.email || "N/A"}
          </p>

          {applicant?.resume && (
            <a
              href={`http://${subdomain}.lvh.me:3001${applicant.resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary mt-3"
            >
              View Resume
            </a>
          )}

          {user?.role == "admin" || user?.role == "user_manager" ? (
            <Button
              className="btn btn-danger mt-3"
              onClick={() => {
                onDelete();
              }}
            >
              Delete this Application
            </Button>
          ) : null}

          <Button
            className="btn btn-info mt-3"
            onClick={() => navigate(`/jobs/${jobId}`)}
          >
            View Job
          </Button>

          <div className="mt-4">
            {applicant?.status == "pending" && user?.role == "company" ? (
              <>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => {
                    onChangeStatus(0);
                  }}
                >
                  Reject
                </button>
                <button
                  className="btn btn-success me-2"
                  onClick={() => {
                    onChangeStatus(1);
                  }}
                >
                  Hire
                </button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
