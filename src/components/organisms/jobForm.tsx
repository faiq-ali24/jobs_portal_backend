import axios from "axios";
import React, { useEffect, useState } from "react";
import { jobFormProps } from "../../interfaces/appInterface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";
import Cookies from "js-cookie";



const JobForm = ({id} : jobFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [brochure, setBrochure] = useState<File | null>(null);
  const [jobDoc, setJobDoc] = useState<File | null>(null);
  const {user} = useUser();
  const navigate = useNavigate()
  const hostParts = window.location.hostname.split('.');
  let subdomain: string | null = null;

  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub; 
  }

   useEffect(() => {
    if (!id) return;
    
    const fetchJob = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          alert("Authorization token missing");
          return;
        }

        const res = await axios.get(
          `http://${subdomain}.lvh.me:3001/api/v1/jobs/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${jwtToken}`,
            },
          }
        );

        const job = res.data.data.attributes;

        setTitle(job.title || "");
        setDescription(job.description || "");
        setSalary(job.salary?.toString() || "");
        setLocation(job.location || "");
      } 
      catch (e) {
        console.error("Error fetching job");
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      alert("Authorization token missing");
      return;
    }

    const formData = new FormData();
    formData.append("job[title]", title);
    formData.append("job[description]", description);
    formData.append("job[salary]", salary);
    formData.append("job[location]", location);
    if (brochure){
      formData.append("job[document]", brochure);
    } 

    try {
      if(id == null){
          const res = await axios.post(
          `http://${subdomain}.lvh.me:3001/api/v1/jobs`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${jwtToken}`,
            },
          }
        );
        toast.success("Job added successfully!");
        navigate("/jobs");
      }
      else{
        const res = await axios.put(
          `http://${subdomain}.lvh.me:3001/api/v1/jobs/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `${jwtToken}`,
            },
          }
        );
        toast.success("Job edited successfully!");
        navigate(`/jobs/${id}`);
      }
    } 
    catch (e) {
      alert("Error creating job");
    }
  };

  return (
    <>
      <div className="card shadow-lg rounded-lg border-1 m-5">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Salary</label>
              <input
                type="number"
                className="form-control"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Brochure</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setBrochure(e.target.files?.[0] || null) }
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Job
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default JobForm;
