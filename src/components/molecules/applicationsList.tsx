import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  applicationsHomeProps,
  applicationModel,
  ApplicationsListProps,
} from "../../interfaces/appInterface";
import ApplicationsCard from "../molecules/applicationsCard";
import { AllApplicationProps } from "../../screens/allApplicationsScreen";
import { statuses } from "../organisms/applicationsHome";

const ApplicationsList: React.FC<AllApplicationProps> = ({
  status,
  setStatus,
  applications,
}) => {
  return (
    <>
      <select
        className="form-select m-3"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
        }}
      >
        <option value="">All</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      {applications.map((app) => (
        <ApplicationsCard key={app.id} {...app} />
      ))}
    </>
  );
};

export default ApplicationsList;
