import React from "react";
import SummaryCard from "../molecules/summaryCard";
import { useUser } from "../../context/userContext";
import { CompanyApplication } from "../../converter/modelConverter";

interface CompaniesHomeProps {
  applications: CompanyApplication[];
  subdomain: string;
}

const CompaniesHome: React.FC<CompaniesHomeProps> = ({
  applications,
  subdomain,
}) => {
  const { user } = useUser();

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

      {user?.role === "company" && (
        <div className="text-center my-5">
          <h3 className="fw-bold text-primary">Add Job Now</h3>
          <p className="text-muted">Post a new job.</p>
          <a
            className="btn btn-success px-4 py-2 rounded-3 shadow-sm"
            onClick={() => {
              window.location.href = `http://${subdomain}.lvh.me:3000/jobs/new`;
            }}
          >
            Add Job
          </a>
        </div>
      )}
    </div>
  );
};

export default CompaniesHome;
