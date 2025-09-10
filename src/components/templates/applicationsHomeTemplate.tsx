import React from "react";
import { applicationsHomeProps } from "../../interfaces/appInterface";
import JobsHeader from "../atoms/jobsHeader";
import ApplicationsHome from "../organisms/applicationsHome";

import { ApplicationModel } from "../../screens/applicationsHomeScreen";

interface ApplicationsHomeTemplateProps {
  status: string;
  setStatus: (v: string) => void;
  applications: ApplicationModel[];
}

const ApplicationsHomeTemplate: React.FC<ApplicationsHomeTemplateProps> = ({
  status,
  setStatus,
  applications,
}) => {
  return (
    <>
      <JobsHeader text={"Applications:"} />
      <ApplicationsHome
        status={status}
        setStatus={setStatus}
        applications={applications}
      />
    </>
  );
};

export default ApplicationsHomeTemplate;
