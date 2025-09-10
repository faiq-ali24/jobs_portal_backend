import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ApplicationsHomeTemplate from "../components/templates/applicationsHomeTemplate";
import { useNavigate, useParams } from "react-router-dom";
import { convertApplicationsList } from "../converter/modelConverter";
import { Urls } from "../utils/urls";

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

enum ApplicationStatus {
  Pending = "0",
  Rejected = "1",
  Hired = "2",
}

const ApplicationsHomeScreen: React.FC = () => {
  const { job_id } = useParams<{ job_id: string }>();
  const jobId = Number(job_id);
  const [status, setStatus] = useState<string>("");
  const [applications, setApplications] = useState<ApplicationModel[]>([]);
  const navigate = useNavigate();

  const hostParts = window.location.hostname.split(".");
  let subdomain: string | null = null;
  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let qStatus: string = "";
        switch (status) {
          case "pending":
            qStatus = ApplicationStatus.Pending;
            break;
          case "rejected":
            qStatus = ApplicationStatus.Rejected;
            break;
          case "hired":
            qStatus = ApplicationStatus.Hired;
            break;
          default:
            qStatus = "";
        }

        const query = `q[status_eq]=${qStatus}`;
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          navigate("/error");
          return;
        }

        const response = await axios.get(
          Urls.fetchJobApplications(`${subdomain}.`, String(jobId), query),
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `${jwtToken}`,
            },
          },
        );

        const appsData = convertApplicationsList(response.data.data);
        setApplications(appsData);
      } catch (e) {
        navigate("/error");
      }
    };

    fetchData();
  }, [status, jobId]);

  return (
    <ApplicationsHomeTemplate
      status={status}
      setStatus={setStatus}
      applications={applications}
    />
  );
};

export default ApplicationsHomeScreen;
