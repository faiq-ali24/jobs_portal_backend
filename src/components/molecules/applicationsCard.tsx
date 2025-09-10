import React from "react";
import { useNavigate } from "react-router-dom";


export interface ApplicationModel {
  id: number;
  user_id: number;
  job_id: number;
  name: string;
  age: number;
  yoe: number;
  status: string;
  email: string;
  resume: string;
}

const ApplicationsCard: React.FC<ApplicationModel> = ({
  id,
  name,
  age,
  yoe,
  status,
  email,
  resume,
  job_id,
}) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/jobs/${job_id}/applications/${id}`);
  };

  return (
    <div className="card shadow-lg rounded-lg border-1 mb-4 m-5">
      <div className="card-body">
        <h5 className="card-title text-primary fw-bold">{name}</h5>
        <h6 className="card-subtitle mb-3 text-muted">Status: {status}</h6>
        <p className="card-text">Email: {email}</p>
        <p className="card-text">Age: {age}</p>
        <p className="card-text">Years of Experience: {yoe}</p>

        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-primary btn-sm" onClick={handleNavigate}>
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsCard;
