import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useUser } from "../context/userContext";
import JobForm from "../components/organisms/jobForm";
import { Urls } from "../utils/urls";

const EditJobScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [brochure, setBrochure] = useState<File | null>(null);
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
    formData.append("job[title]", title);
    formData.append("job[description]", description);
    formData.append("job[salary]", salary);
    formData.append("job[location]", location);
    if (brochure) {
      formData.append("job[document]", brochure);
    }

    try {
      const res = await axios.patch(
        Urls.editJob(`${subdomain}.`, String(id)),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${jwtToken}`,
          },
        },
      );
      toast.success("Job edited successfully!");
      navigate("/jobs");
    } catch (e) {
      navigate("/error");
    }
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          navigate("/error");
          return;
        }

        const res = await axios.get(
          `http://${subdomain}.lvh.me:3001/api/v1/jobs/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${jwtToken}`,
            },
          },
        );

        const job = res.data.data.attributes;

        setTitle(job.title || "");
        setDescription(job.description || "");
        setSalary(job.salary?.toString() || "");
        setLocation(job.location || "");
      } catch (e) {
        navigate("/error");
      }
    };

    fetchJob();
  }, []);

  return (
    <>
      <p className="fs-1 fw-bold m-5">Edit the Job!</p>
      <JobForm
        title={title}
        description={description}
        salary={salary}
        location={location}
        brochure={brochure}
        setTitle={setTitle}
        setDescription={setDescription}
        setSalary={setSalary}
        setLocation={setLocation}
        setBrochure={setBrochure}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default EditJobScreen;
