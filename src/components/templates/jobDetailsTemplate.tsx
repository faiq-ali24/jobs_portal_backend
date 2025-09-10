import React from "react";
import JobHeader from "../atoms/jobsHeader";
import JobDetails from "../organisms/jobDetails";
import { userProfile } from "../../interfaces/appInterface";
import { JobData } from "../../screens/jobsDetailsScreen";

export interface UserModel {
  id: number;
  name: string;
  role: string;
  email: string;
  bio: string;
  location: string;
  subdomain: string | null;
}

interface JobDetailsTemplateProps {
  job: JobData;
  user: UserModel | null;
  onDelete: () => void;
  onUpdate: () => void;
  onViewApplications: () => void;
  onApply: () => void;
}

const JobDetailsTemplate: React.FC<JobDetailsTemplateProps> = ({
  job,
  user,
  onDelete,
  onUpdate,
  onViewApplications,
  onApply,
}) => {
  return (
    <>
      <JobHeader text="Apply now!" />
      <JobDetails
        job={job}
        user={user}
        onDelete={onDelete}
        onUpdate={onUpdate}
        onViewApplications={onViewApplications}
        onApply={onApply}
      />
    </>
  );
};

export default JobDetailsTemplate;
