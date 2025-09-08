import React, { useEffect, useState } from "react";
import axios from "axios";
import { applicationsHomeProps, applicationModel, ApplicationsListProps } from "../../interfaces/appInterface";
import ApplicationsCard from "../molecules/applicationsCard";



const ApplicationsList = ({ status, setStatus, statuses, applications }: ApplicationsListProps) => {
  return (
    <>
      <select
        className="form-select m-3"
        value={status}
        onChange={(e) => {setStatus(e.target.value)}}
      >
        <option value="">All</option>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
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
