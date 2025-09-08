import React, { useContext, useEffect,useState } from "react";
import JobHeader from "../atoms/jobsHeader";
import axios from "axios";
import userContext, { useUser } from "../../context/userContext";
import { jobDetailsProps } from "../../interfaces/appInterface";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";







const JobDetails = ({id}: jobDetailsProps) => {
  const { user } = useUser();
  
  const [title, setTitle] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [companyId, setCompanyId] = useState(-1)
  const [location, setLocation] = useState("")
  const [salary, setSalary] = useState(0)
  const [description, setDescription] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [brochure, setBrochure] = useState<string | null>(null)
  const navigate = useNavigate();
  const hostParts = window.location.hostname.split('.');
  let subdomain: string | null = null;

  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub; 
  }

    const handleDelete = () =>{
      try{
        const jwtToken = Cookies.get('jwtToken');
        if(!jwtToken){
          alert("Authroization token missing.")
          return;
        }
        const res = axios.delete(`http://${subdomain}.lvh.me:3001/api/v1/jobs/${id}`,{
          headers: {
            Authorization: `${jwtToken}`
          }
        });
        navigate("/jobs");
        toast.success("Job deleted successfully!");
      }
      catch(e){
        alert("Delete Failed.")
      }
    }



    useEffect(() => {
    async function fetchJobDetails() {
      try {
        const jwtToken = Cookies.get('jwtToken');
        if (!jwtToken) {
            alert('Authorization token missing');
            return;
        }
        
        const jobRes = await axios.get(`http://${subdomain}.lvh.me:3001/api/v1/jobs/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${jwtToken}`
          },
        });

        const jobData = jobRes.data;

        setTitle(jobData.data.attributes.title);
        setDescription(jobData.data.attributes.description);
        setSalary(jobData.data.attributes.salary);
        setLocation(jobData.data.attributes.location);
        setJobDescription(jobData.data.attributes.job_description);
        setBrochure(jobData.data.attributes.brochure);
        setCompanyId(jobData.data.attributes.company_id)
        
        const companyRes = await axios.get(
          `http://${subdomain}.lvh.me:3001/api/v1/show/${jobData.data.attributes.company_id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `${jwtToken}`
            },
          }
        );

        const companyData = companyRes.data;
        setCompanyName(companyData.name);
      } 
      catch (e) {
        console.error("Error fetching job details");
      }
    }

    fetchJobDetails();
  }, [id]);


  return (
      <>
        <div className="container mt-4">
          <div className="card shadow-lg border-0 rounded-4">
            <div className="card-body p-4">
              <h3 className="card-title text-primary fw-bold">{title}</h3>
              <h5 className="text-muted mb-3">{companyName}</h5>
              <hr />

              <p className="mb-2">
                <strong className="text-dark">Location:</strong> {location}
              </p>
              <p className="mb-2">
                <strong className="text-dark"> Salary:</strong>{" "}
                <span className="badge bg-success fs-6">
                  {salary.toLocaleString()} PKR
                </span>
              </p>
              <p className="mb-2">
                <strong className="text-dark">Description:</strong> {description}
              </p>
              <p className="mb-2">
                <strong className="text-dark">Job Details:</strong> {jobDescription}
              </p>

              {brochure && (
                <a
                  href={`http://${subdomain}.lvh.me:3001${brochure}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-primary mt-3"
                >
                  View Brochure
                </a>
              )}

              <div className="mt-4 d-flex flex-wrap gap-2">
                {((user?.role == "company" && user?.id == companyId) || user?.role == "admin" || user?.role == "company_manager") ? (
                  <>
                    <button className="btn btn-danger" onClick={handleDelete}>
                      Delete
                    </button>
                    {user?.role == "company" ? (
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          navigate(`/jobs/${id}/edit`);
                        }}
                      >
                        Update
                      </button>
                    ) : null}
                    <button
                      className="btn btn-info text-white"
                      onClick={() => {
                        navigate(`/jobs/${id}/applications`);
                      }}
                    >
                      View Applications
                    </button>
                  </>
                ) : user?.role == "candidate" ? (
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      navigate(`/jobs/${id}/new_application`);
                    }}
                  >
                    Apply Now
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );

};

export default JobDetails;
