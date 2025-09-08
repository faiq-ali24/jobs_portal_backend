import React from "react";

interface SummaryCardProps {
  total: number;
  pending: number;
  rejected: number;
  hired : number;
}

const SummaryCard = ({ total, pending, rejected , hired} : SummaryCardProps) => {
  return (
    <div className="card shadow-sm border-0 rounded-4 mb-4">
      <div className="card-body">
        <h5 className="card-title fw-bold text-primary">Application Summary</h5>
        <p className="mb-2">
          <strong>Total Applied:</strong> {total}
        </p>
        <p className="mb-2">
          <strong>Pending:</strong>{" "}
          <span className="badge bg-warning text-dark">{pending}</span>
        </p>
        <p className="mb-2">
          <strong>Rejected:</strong>{" "}
          <span className="badge bg-danger">{rejected}</span>
        </p>
        <p className="mb-2">
          <strong>Accepted:</strong>{" "}
          <span className="badge bg-success">{hired}</span>
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
