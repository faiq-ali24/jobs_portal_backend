import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import CompanyCard from "../molecules/companyCard";
import SummaryCard from "../molecules/summaryCard";
import {
  Application,
  Company,
  convertApplication,
  convertCompaniesList,
} from "../../converter/modelConverter";

const CandidatesHome = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          alert("Authorization token missing");
          return;
        }

        const appsRes = await axios.get(
          "http://lvh.me:3001/api/v1/applications/get_all",
          {
            headers: { Authorization: `${jwtToken}` },
          }
        );
        setApplications(appsRes.data.data.map(convertApplication));

        const compRes = await axios.get(
          "http://lvh.me:3001/api/v1/users/get_companies",
          {
            headers: { Authorization: `${jwtToken}` },
          }
        );
        setCompanies(convertCompaniesList(compRes.data.data));
      } 
      catch (e) {
        console.error("Error fetching home data");
      }
    };

    fetchData();
  }, []);

  const total = applications.length;
  const pending = applications.filter((a) => a.status === "pending").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;
  const hired = applications.filter((a) => a.status === "hired").length;

  return (
    <div className="container mt-5">
      <SummaryCard total={total} pending={pending} rejected={rejected} hired={hired} />

      <div className="text-center my-5">
        <h3 className="fw-bold text-success">Apply Now</h3>
        <p className="text-muted">
          Explore companies and start your journey today.
        </p>
      </div>

      <div className="row">
        {companies.map((company) => (
          <div key={company.id} className="col-md-6 col-lg-4">
            <CompanyCard id={company.id} email={company.email} name={company.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CandidatesHome;
