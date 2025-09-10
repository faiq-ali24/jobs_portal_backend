import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import JobsHeader from "../components/atoms/jobsHeader";
import CandidatesHome from "../components/organisms/candidatesHome";
import CompaniesHome from "../components/organisms/companiesHome";
import {
  Application,
  CompanyApplication,
  convertApplication,
  convertCompanyApplicationsList,
} from "../converter/modelConverter";
import { Urls } from "../utils/urls";

const HomeScreen: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [applications, setApplications] = useState<
    Application[] | CompanyApplication[]
  >([]);

  const hostParts = window.location.hostname.split(".");
  let subdomain: string | null = null;
  if (hostParts.length > 2) {
    subdomain = hostParts[0];
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          navigate("/error");
          return;
        }

        if (!subdomain) {
          navigate("/error");
          return;
        }

        const appsRes = await axios.get(
          Urls.fetchApplications(`${subdomain}.`),
          {
            headers: { Authorization: `${jwtToken}` },
          },
        );

        if (user?.role === "candidate") {
          setApplications(appsRes.data.data.map(convertApplication));
        } else if (user?.role === "company") {
          const allApps = convertCompanyApplicationsList(appsRes.data.data);
          const companyApps = allApps.filter(
            (a: CompanyApplication) => a.company_id === user?.id,
          );
          setApplications(companyApps);
        }
      } catch (e) {
        navigate("/error");
      }
    };

    fetchData();
  }, [user]);
  console.log("Cand:");
  console.log(applications);
  return (
    <>
      <JobsHeader text="Dashboard" />
      {user?.role === "candidate" ? (
        <CandidatesHome applications={applications as Application[]} />
      ) : user?.role === "company" ? (
        <CompaniesHome
          applications={applications as CompanyApplication[]}
          subdomain={subdomain!}
        />
      ) : null}
    </>
  );
};

export default HomeScreen;
