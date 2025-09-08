import React from "react";

interface CompanyCardProps {
  id: number;
  email: string;
  name: string
}

const CompanyCard = ({ id, email , name} : CompanyCardProps) => {
  const handleRedirect = () => {
    window.location.href = `http://${id}.lvh.me:3000/jobs`;
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 mb-3">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h6 className="fw-bold text-dark mb-1">{name? name : `Company #${id}`}</h6>
          <small className="text-muted">{email}</small>
        </div>
        <button className="btn btn-outline-primary" onClick={handleRedirect}>
          View Jobs
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
