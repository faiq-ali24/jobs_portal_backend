import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../../context/userContext";
import { applicationDetailsProps } from "../../interfaces/appInterface";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const ApplicationDetails = ({ jobId, id }: applicationDetailsProps) => {

  const [name, setName] = useState("");
  const [age, setAge] = useState<number>(0);
  const [yoe, setYoe] = useState<number>(0);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState<string | null>(null);
  const [userId, setUserId] = useState<number>(-1);
  const hostParts = window.location.hostname.split('.');
  let subdomain: string | null = null;

  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub; 
  }
  const {user} = useUser();

  const navigate = useNavigate();

// http://127.0.0.1:3001/api/v1/jobs/19/applications/9/change_status

  const handleStatusChange = (changedStatus : number) => {
    let newStatus = "";
    if(changedStatus == 0)
      newStatus = "rejected";
    else
      newStatus = "accepted";
    try{
      const jwtToken = Cookies.get("jwtToken");
      if(!jwtToken){
        alert("Authorization token missing");
        return;
      }
      const res = axios.patch(`http://${subdomain}.lvh.me:3001/api/v1/jobs/${jobId}/applications/${id}/change_status`,
      {
        "status" : `${newStatus}`
      },
      {
        headers: {
           Authorization: `${jwtToken}`
        }
      })
      toast.success("Status updated successfully!");
      window.history.back()
    }
    catch(e){
      toast.success("Error occured");
    }
  }

  const handleDelete = () => {
    try{
      const jwtToken = Cookies.get("jwtToken");
        if(!jwtToken){
          alert("Authorization token missing");
          return;
        }
        const res = axios.delete(`http://${subdomain}.lvh.me:3001/api/v1/applications/${id}`,
        {
          headers: {
             Authorization: `${jwtToken}`
          }
        })
        toast.success("Application deleted successfully!");
        window.history.back()
      }
    catch(e){
      toast.success("Error occured");
    }
  }

  useEffect(() => {
    async function fetchApplicationDetails() {
      try {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          alert("Authorization token missing");
          return;
        }

        const appRes = await axios.get(
          `http://${subdomain}.lvh.me:3001/api/v1/jobs/${jobId}/applications/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${jwtToken}`,
            },
          }
        );

        const appData = appRes.data.data.attributes;
        setName(appData.name);
        setAge(appData.age);
        setYoe(appData.yoe);
        setStatus(appData.status);
        setEmail(appData.email);
        setResume(appData.resume);
        setUserId(appData.user_id);
      } 
      catch (e) {
        toast.success("Error fetching application details");
      }
    }

    fetchApplicationDetails();
  }, [jobId, id]);

  return (
    <div className="container mt-4">
      <div className="card shadow-sm mt-3">
        <div className="card-body">
          <h3 className="card-title">{name}</h3>
          <h5 className="text-muted">Status: {status}</h5>
          <hr />

          <p className="mb-2">
            <strong>Age:</strong> {age}
          </p>
          <p className="mb-2">
            <strong>Experience:</strong> {yoe} years
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {email || "N/A"}
          </p>

          {resume && (
            <a
              href={`http://${subdomain}.lvh.me:3001${resume}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary mt-3"
            >
              View Resume
            </a>
          )}

            {
              (user?.role == "admin" || user?.role == "user_manager") ? 
              <Button className="btn btn-danger mt-3" onClick={handleDelete}>
                Delete this Application
              </Button>
              : null
            }

            <Button className="btn btn-info mt-3" onClick={()=> navigate(`/jobs/${jobId}`)}>
              View Job
            </Button>
          <div className="mt-4">
            {
                (status == "pending" && user?.role == "company") ?
                <>
                    <button className="btn btn-danger me-2" onClick={() => {handleStatusChange(0)}}>Reject</button>
                    <button className="btn btn-success me-2" onClick={() => {handleStatusChange(1)}}>Hire</button>
                </>
                :
                null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
