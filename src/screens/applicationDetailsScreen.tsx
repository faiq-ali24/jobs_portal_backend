import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import ApplicationDetailsTemplate from "../components/templates/applicationDetailsTemplate";
import { Urls } from "../utils/urls";

export interface ApplicantProps {
  name: string;
  age: number;
  yoe: number;
  status: string;
  email: string;
  resume: string | null;
  userId: number;
}

const ApplicationDetailsScreen: React.FC = () => {
  const { job_id, id } = useParams<{ job_id: string; id: string }>();
  const navigate = useNavigate();

  const [applicant, setApplicant] = useState<ApplicantProps | null>(null);

  const hostParts = window.location.hostname.split(".");
  let subdomain: string | null = null;
  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub;
  }

  useEffect(() => {
    async function fetchApplicationDetails() {
      try {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          navigate("/error");
          return;
        }

        const appRes = await axios.get(
          Urls.fetchApplicationDetails(`${subdomain}.`, String(job_id), String(id)),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${jwtToken}`,
            },
          },
        );

        const appData = appRes.data.data.attributes;
        setApplicant({
          name: appData.name,
          age: appData.age,
          yoe: appData.yoe,
          status: appData.status,
          email: appData.email,
          resume: appData.resume,
          userId: appData.user_id,
        });
      } catch (e) {
        navigate("/error");
        toast.success("Error fetching application details");
      }
    }

    fetchApplicationDetails();
  }, [job_id, id]);

  const handleStatusChange = async (changedStatus: number) => {
    let newStatus = "";
    if (changedStatus == 0) newStatus = "rejected";
    else newStatus = "hired";

    try {
      const jwtToken = Cookies.get("jwtToken");
      if (!jwtToken) {
        navigate("/error");
        return;
      }
      await axios.patch(
        Urls.applicationStatusChange(`${subdomain}.`, String(job_id), String(id)),
        {
          status: `${newStatus}`,
        },
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        },
      );
      toast.success("Status updated successfully!");
      navigate("/all_applications");
    } catch (e) {
      navigate("/error");
      toast.success("Error occured");
    }
  };

  const handleDelete = async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      if (!jwtToken) {
        navigate("/error");
        return;
      }
      await axios.delete(
        `http://${subdomain}.lvh.me:3001/api/v1/applications/${Number(id)}`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        },
      );
      toast.success("Application deleted successfully!");
      navigate("/all_applications");
    } catch (e) {
      navigate("/error");
      toast.success("Error occured");
    }
  };

  return (
    <ApplicationDetailsTemplate
      jobId={Number(job_id)}
      id={Number(id)}
      applicant={applicant}
      onChangeStatus={handleStatusChange}
      onDelete={handleDelete}
    />
  );
};

export default ApplicationDetailsScreen;
