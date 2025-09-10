import React from "react";
import ApplicationsList from "../molecules/applicationsList";

export const statuses: string[] = ["pending", "hired", "rejected"];

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

export interface ApplicationsHomeProps {
  status: string;
  setStatus: (v: string) => void;
  applications: ApplicationModel[];
}

const ApplicationsHome: React.FC<ApplicationsHomeProps> = ({
  status,
  setStatus,
  applications,
}) => {
  return (
    <ApplicationsList
      status={status}
      setStatus={setStatus}
      applications={applications}
    />
  );
};

export default ApplicationsHome;
