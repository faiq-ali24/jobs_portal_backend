import React from "react";
import SummaryCard from "../molecules/summaryCard";
import { Application } from "../../converter/modelConverter";

interface CandidatesHomeProps {
  applications: Application[];
}

const CandidatesHome: React.FC<CandidatesHomeProps> = ({ applications }) => {
  const total = applications.length;
  const pending = applications.filter((a) => a.status === "pending").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;
  const hired = applications.filter((a) => a.status === "hired").length;

  return (
    <div className="container mt-5">
      <SummaryCard
        total={total}
        pending={pending}
        rejected={rejected}
        hired={hired}
      />

      <div className="text-center my-5">
        <h3 className="fw-bold text-success">Apply Now</h3>
        <p className="text-muted">
          Explore companies.
        </p>
      </div>
    </div>
  );
};

export default CandidatesHome;
