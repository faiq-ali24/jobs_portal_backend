import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {
  applicationsHomeProps,
  applicationModel,
} from "../../interfaces/appInterface";
import ApplicationsCard from "../molecules/applicationsCard";
import ApplicationsList from "../molecules/applicationsList";
import { statuses } from "./applicationsHome";
import { useUser } from "../../context/userContext";
import { convertApplicationsList } from "../../converter/modelConverter";
import { AllApplicationProps } from "../../screens/allApplicationsScreen";

const AllApplications: React.FC<AllApplicationProps> = ({
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

export default AllApplications;
