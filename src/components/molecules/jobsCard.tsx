import React from "react";
import { useNavigate } from "react-router-dom";

export interface JobProps {
  id: number;
  title: string;
  description: string;
  salary: number;
  location: string;
}

const JobsCard: React.FC<JobProps> = ({ id, title, description, salary, location }) => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(`/jobs/${id}`);
  };

  return (
    <div className="card shadow-lg border-0 mb-4 m-3 rounded-4">
      <div className="card-header bg-gradient bg-primary text-white">
        <h5 className="mb-0 fw-bold">{title}</h5>
      </div>

      <div className="card-body">
        <h6 className="card-subtitle mb-3 text-muted">
          <i className="me-2 text-danger"></i>
          {location}
        </h6>
        <p className="card-text text-secondary">{description}</p>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <span className="badge bg-success fs-6 px-3 py-2 shadow-sm">
            {salary.toLocaleString()} PKR
          </span>
          <button
            className="btn btn-outline-primary btn-sm px-3"
            onClick={handleNav}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsCard;
