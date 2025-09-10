import React from "react";
import JobsHeader from "../atoms/jobsHeader";
import ApplicationDetails from "../organisms/applicationDetails";
import { ApplicantProps } from "../../screens/applicationDetailsScreen";

export interface ApplicationDetailsProps {
  jobId: number;
  id: number;
  applicant: ApplicantProps | null;
  onChangeStatus: (changedStatus: number) => void;
  onDelete: () => void;
}

const ApplicationDetailsTemplate: React.FC<ApplicationDetailsProps> = ({
  jobId,
  id,
  applicant,
  onChangeStatus,
  onDelete,
}) => {
  return (
    <>
      <JobsHeader text="Application" />
      <ApplicationDetails
        jobId={jobId}
        id={id}
        applicant={applicant}
        onChangeStatus={onChangeStatus}
        onDelete={onDelete}
      />
    </>
  );
};

export default ApplicationDetailsTemplate;
