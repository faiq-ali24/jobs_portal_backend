import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userContext, useUser } from "../../context/userContext";
import Cookies from "js-cookie";


export interface applicationFormProps{
    job_id: number;
}

const ApplicationForm = ({job_id} : applicationFormProps) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [cgpa, setCgpa] = useState("");
    const [yoe, setYoe] = useState("");
    const [resume, setResume] = useState<File>();
    const {user} = useUser();
    const navigate = useNavigate();
    const hostParts = window.location.hostname.split('.');
    let subdomain: string | null = null;

    if (hostParts.length > 2) {
      const sub = hostParts[0];
      if (sub) subdomain = sub; 
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
            alert("Authorization token missing");
            return;
        }

        const formData = new FormData();
        formData.append("application[name]", name);
        formData.append("application[age]", age);
        formData.append("application[cgpa]", cgpa);
        formData.append("application[yoe]", yoe);
        if (resume) formData.append("application[document]", resume);

        try {
            const res = await axios.post(
            `http://${subdomain}.lvh.me:3001/api/v1/jobs/${job_id}/applications`,
            formData,
            {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `${jwtToken}`,
            },
            }
        );
            toast.success("Job added successfully!");
            navigate(`/jobs/${job_id}`);
        } 
        catch (e) {
            toast.success("Error creating job");
        }
    };

    return (
        <>

        <div className="card shadow-lg rounded-lg border-1 m-5">
            <div className="card-body">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label">Age</label>
                <input
                    className="form-control"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label">CGPA</label>
                <input
                    type="number"
                    className="form-control"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label">Years of experience</label>
                <input
                    type="number"
                    className="form-control"
                    value={yoe}
                    onChange={(e) => setYoe(e.target.value)}
                    required
                />
                </div>

                <div className="mb-3">
                <label className="form-label">Resume</label>
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setResume(e.target.files?.[0])}
                />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit Application
                </button>
            </form>
            </div>
        </div>
        </>
    );
}


export default ApplicationForm;