import React, { useEffect, useState } from "react";
import axios from "axios";
import { applicationsHomeProps, applicationModel } from "../../interfaces/appInterface";
import ApplicationsCard from "../molecules/applicationsCard";
import ApplicationsList from "../molecules/applicationsList";
import { useUser } from "../../context/userContext";
import Cookies from "js-cookie";
import { convertApplicationsList } from "../../converter/modelConverter";

export const statuses: string[] = ["pending", "hired", "rejected"];

const ApplicationsHome = ({ jobId }: applicationsHomeProps) => {
  const [status, setStatus] = useState<string>("");
  const [applications, setApplications] = useState<applicationModel[]>([]);
  const {user} = useUser();
  const hostParts = window.location.hostname.split('.');
  let subdomain: string | null = null;

  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub; 
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        let qStatus :string = "";
        if (status == "hired")
            qStatus = "2";
        else if(status == "rejected")
            qStatus = "1"
        else if(status == "pending")
          qStatus = "0"
        const query = `q[status_eq]=${qStatus}`;
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          alert("Authorization token missing");
          return;
        }
        const response = await axios.get(
          `http://${subdomain}.lvh.me:3001/api/v1/jobs/${jobId}/applications?${query}`,
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `${jwtToken}`,
            },
          }
        );

        const appsData = convertApplicationsList(response.data.data);

        setApplications(appsData);
      } 
      catch (e) {
        alert("Error fetching applications");
      }
    };

    fetchData();
  }, [status, jobId]);

  return (
    <>
      <ApplicationsList
        status={status}
        setStatus={setStatus}
        statuses={statuses}
        applications={applications}
      />
    </>
  );
};

export default ApplicationsHome;
