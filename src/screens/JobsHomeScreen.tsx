import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import { makeStyles } from "tss-react/mui";
import Pagination from "@mui/material/Pagination";
import Input from "@mui/material/Input";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import JobsFilter from "../components/molecules/jobsFilter";
import JobsCard from "../components/molecules/jobsCard";
import JobsHeader from "../components/atoms/jobsHeader";
import { Urls } from "../utils/urls";

export const cities: string[] = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Multan",
  "Faisalabad",
  "Queta",
];
export const salaries: number[] = [100000, 300000, 500000];

const useStyles = makeStyles()(() => ({}));

export interface JobModel {
  location: string;
  salary: number;
  title: string;
  id: number;
  description: string;
  company_id: number;
  brochure: string | undefined;
  jobDescription: string | undefined;
}
// q[title_cont]=

const JobsHomeScreen: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<JobModel[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const hostParts = window.location.hostname.split(".");
  let subdomain: string | null = null;

  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub;
  }
  const { user } = useUser();

  const { classes } = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `q[title_cont]=${title}&q[salary_gteq]=${salary}&q[location_cont]=${location}`;
        const jwtToken = Cookies.get("jwtToken");
        console.log(jwtToken);
        if (!jwtToken) {
          navigate("/error");
          return;
        }
        let sub_domain = subdomain;
        const response = await axios.get(
          Urls.fetchJobs(`${sub_domain}.`, String(page), query),
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `${jwtToken}`,
            },
          },
        );

        const jobsData: JobModel[] = response.data.jobs.map((job: any) => ({
          id: Number(job.id),
          title: job.attributes.title,
          description: job.attributes.description,
          salary: job.attributes.salary ?? 0,
          location: job.attributes.location,
          company_id: job.attributes.company_id,
          brochure: job.attributes.brochure,
          jobDescription: job.attributes.job_description,
        }));

        setJobs(jobsData);
        if (response.data.meta) {
          setTotalPages(response.data.meta.total_pages ?? 1);
        } else {
          setTotalPages(1);
        }
      } catch (e) {
        navigate("/error");
      }
    };

    fetchData();
  }, [title, location, salary, page]);

  useEffect(() => {
    setPage(1);
  }, [title, location, salary]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <JobsHeader text="Jobs" />
      <JobsFilter
        location={location}
        salary={salary}
        title={title}
        setLocation={setLocation}
        setSalary={setSalary}
        setTitle={setTitle}
      />

      {user?.role == "company" ? (
        <div className="container my-3">
          <a href="/jobs/new" className="btn btn-primary">
            Add Job
          </a>
        </div>
      ) : null}

      <div className="container">
        <div className="row">
          {jobs.map((job) => (
            <div key={job.id} className="col-md-6">
              <JobsCard
                id={job.id}
                title={job.title}
                description={job.description}
                salary={job.salary}
                location={job.location}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        style={{ display: "flex", justifyContent: "center", margin: "16px 0" }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </>
  );
};

export default JobsHomeScreen;
