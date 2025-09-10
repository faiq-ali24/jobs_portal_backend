import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import JobDetailsTemplate from "../components/templates/jobDetailsTemplate";
import { useUser } from "../context/userContext";
import { Urls } from "../utils/urls";

export interface JobData {
  id: number;
  title: string;
  companyName: string;
  companyId: number;
  location: string;
  salary: number;
  description: string;
  jobDescription: string;
  brochure: string | null;
}

const JobsDetailsScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();

  const [job, setJob] = useState<JobData | null>(null);

  const hostParts = window.location.hostname.split(".");
  let subdomain: string | null = null;
  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub;
  }

  const fetchJobDetails = async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      if (!jwtToken) {
        navigate("/error");
        return;
      }

      const jobRes = await axios.get(
        Urls.fetchJobDetails(`${subdomain}.`, String(id)),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${jwtToken}`,
          },
        },
      );

      const jobData = jobRes.data.data.attributes;

      const companyRes = await axios.get(
        Urls.fetchCompanyDetails(`${subdomain}.`, String(jobData.company_id)),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${jwtToken}`,
          },
        },
      );

      setJob({
        id: Number(id),
        title: jobData.title,
        description: jobData.description,
        salary: jobData.salary,
        location: jobData.location,
        jobDescription: jobData.job_description,
        brochure: jobData.brochure,
        companyId: jobData.company_id,
        companyName: companyRes.data.name,
      });
    } catch (e) {
      navigate("/error");
    }
  };

  const handleDelete = async () => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      if (!jwtToken) {
        navigate("/error");
        return;
      }
      await axios.delete(Urls.deleteJob(`${subdomain}.`, String(id)), {
        headers: { Authorization: `${jwtToken}` },
      });
      toast.success("Job deleted successfully!");
      navigate("/jobs");
    } catch (e) {
      navigate("/error");
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, [id]);

  if (!job) return <h3 className="text-center mt-5">Loading job details...</h3>;

  return (
    <JobDetailsTemplate
      job={job}
      user={user}
      onDelete={handleDelete}
      onUpdate={() => navigate(`/jobs/${id}/edit`)}
      onViewApplications={() => navigate(`/jobs/${id}/applications`)}
      onApply={() => navigate(`/jobs/${id}/new_application`)}
    />
  );
};

export default JobsDetailsScreen;
