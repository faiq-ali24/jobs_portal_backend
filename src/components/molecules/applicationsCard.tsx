import React from "react";
import { applicationModel } from "../../interfaces/appInterface";
import { useNavigate } from "react-router-dom";


const ApplicationsCard = ({ id, name, age, yoe, status, email, resume, job_id }: applicationModel) => {
  const navigate = useNavigate();
  return (
    <div className="card shadow-lg rounded-lg border-1 mb-4 m-5">
      <div className="card-body">
        <h5 className="card-title text-primary fw-bold">{name}</h5>
        <h6 className="card-subtitle mb-3 text-muted">Status: {status}</h6>
        <p className="card-text">Email: {email}</p>
        <p className="card-text">Age: {age}</p>
        <p className="card-text">Years of Experience: {yoe}</p>

        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-primary btn-sm" onClick={() => {navigate(`/jobs/${job_id}/applications/${id}`)}}>Details</button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsCard;
