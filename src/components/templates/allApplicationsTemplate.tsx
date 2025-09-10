import React, { useEffect, useState } from "react";
import JobsHeader from "../atoms/jobsHeader";
import AllApplications from "../organisms/allApplications";
import { AllApplicationProps } from "../../screens/allApplicationsScreen";

const AllApplicationsTemplate: React.FC<AllApplicationProps> = ({
  status,
  setStatus,
  applications,
}) => {
  return (
    <>
      <JobsHeader text={"Your Applications:"} />
      <AllApplications
        status={status}
        setStatus={setStatus}
        applications={applications}
      />
    </>
  );
};

export default AllApplicationsTemplate;
