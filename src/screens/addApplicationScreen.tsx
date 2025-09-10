import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import JobsHeader from "../components/atoms/jobsHeader";
import ApplicationForm from "../components/organisms/applicationForm";
import { useUser } from "../context/userContext";
import { Urls } from "../utils/urls";

const AddApplicationScreen: React.FC = () => {
  const { job_id } = useParams<{ job_id: string }>();
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [cgpa, setCgpa] = useState("");
  const [yoe, setYoe] = useState(0);
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const { user } = useUser();
  const navigate = useNavigate();
  const hostParts = window.location.hostname.split(".");
  let subdomain: string | null = null;

  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/error");
      return;
    }

    const formData = new FormData();
    formData.append("application[name]", name);
    formData.append("application[age]", String(age));
    formData.append("application[cgpa]", cgpa);
    formData.append("application[email]", email);
    formData.append("application[yoe]", String(yoe));
    if (resume) formData.append("application[document]", resume);

    try {
      const res = await axios.post(
        Urls.addJobApplication(`${subdomain}.`, String(job_id)),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${jwtToken}`,
          },
        },
      );
      toast.success("Job added successfully!");
      navigate(`/jobs/${job_id}`);
    } catch (e) {
      navigate("/error");
      toast.success("Error creating job");
    }
  };
  return (
    <>
      <JobsHeader text="Apply for job!" />
      <ApplicationForm
        name={name}
        age={age}
        cgpa={cgpa}
        yoe={yoe}
        email={email}
        resume={resume}
        setResume={setResume}
        setName={setName}
        setAge={setAge}
        setCgpa={setCgpa}
        setYoe={setYoe}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default AddApplicationScreen;
