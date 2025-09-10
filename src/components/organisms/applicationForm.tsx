import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { userContext, useUser } from "../../context/userContext";

export interface ApplicationFormProps {
  name: string;
  age: number;
  cgpa: string;
  yoe: number;
  email: string;
  resume: File | null;

  setResume: (value: File | null) => void;
  setName: (value: string) => void;
  setAge: (value: number) => void;
  setCgpa: (value: string) => void;
  setYoe: (value: number) => void;
  setEmail: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  name,
  age,
  cgpa,
  yoe,
  email,
  resume,
  setResume,
  setName,
  setAge,
  setCgpa,
  setYoe,
  setEmail,
  handleSubmit,
}) => {
  return (
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
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
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
              onChange={(e) => setYoe(Number(e.target.value))}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Resume</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                setResume(e.target.files?.[0] ? e.target.files?.[0] : null)
              }
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
