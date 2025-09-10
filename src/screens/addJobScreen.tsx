import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JobForm from "../components/organisms/jobForm";
import { useUser } from "../context/userContext";
import { Urls } from "../utils/urls";

const AddJobScreen: React.FC = () => {
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
      const res = await axios.post(
        Urls.addJob(`${subdomain}.`),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${jwtToken}`,
          },
        },
      );
      toast.success("Job added successfully!");
      navigate("/jobs");
    } catch (e) {
      navigate("/error");
    }
  };

  return (
    <>
      <p className="fs-1 fw-bold m-5">Add a Job!</p>
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

export default AddJobScreen;
