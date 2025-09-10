import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useUser } from "../../context/userContext";

export interface JobFormProps {
  title: string;
  description: string;
  salary: string;
  location: string;
  brochure: File | null;

  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setSalary: (value: string) => void;
  setLocation: (value: string) => void;
  setBrochure: (value: File | null) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const JobForm: React.FC<JobFormProps> = ({
  title,
  description,
  salary,
  location,
  brochure,
  setTitle,
  setDescription,
  setSalary,
  setLocation,
  setBrochure,
  handleSubmit,
}) => {
  return (
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
              onChange={(e) => setBrochure(e.target.files?.[0] || null)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
