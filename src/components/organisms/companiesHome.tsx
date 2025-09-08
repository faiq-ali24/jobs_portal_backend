import Input from "@mui/material/Input";
import React, { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import JobsFilter from "../molecules/jobsFilter";
import JobsCard from "../molecules/jobsCard";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { useUser } from "../../context/userContext";
import Cookies from "js-cookie";
import { jobModel } from "../../interfaces/appInterface";
import { convertJobsList } from "../../converter/modelConverter"; // adjust path

export const cities: string[] = ["Lahore", "Karachi", "Islamabad", "Multan", "Faisalabad", "Queta"];
export const salaries: number[] = [100000, 300000, 500000];

const useStyles = makeStyles()(() => ({}));

const JobsHome = () => {
  const [location, setLocation] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);
  const [title, setTitle] = useState<string>("");

  const [jobs, setJobs] = useState<jobModel[]>([]);
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
        const query = `q[title_cont]=${title}&q[salary_gt]=${salary}&q[location_cont]=${location}`;
        const jwtToken = Cookies.get("jwtToken");

        if (!jwtToken) {
          alert("Authorization token missing");
          return;
        }

        const response = await axios.get(
          `http://${subdomain}.lvh.me:3001/api/v1/jobs?page=${page}&${query}`,
          {
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
              Authorization: `${jwtToken}`,
            },
          }
        );

        setJobs(convertJobsList(response.data.jobs));

        if (response.data.meta) {
          setTotalPages(response.data.meta.total_pages ?? 1);
        } else {
          setTotalPages(1);
        }
      } catch (e) {
        alert("Error fetching jobs");
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
      <JobsFilter
        location={location}
        salary={salary}
        title={title}
        setLocation={setLocation}
        setSalary={setSalary}
        setTitle={setTitle}
      />

      {user?.role === "company" && (
        <div className="container my-3">
          <a href="/jobs/new" className="btn btn-primary">
            Add Job
          </a>
        </div>
      )}

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

      <div style={{ display: "flex", justifyContent: "center", margin: "16px 0" }}>
        <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
      </div>
    </>
  );
};

export default JobsHome;
