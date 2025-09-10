import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import LoginTemplate from "../components/templates/loginTemplate";
import { UserLogin } from "../components/organisms/login";
import { Urls } from "../utils/urls";

interface Company {
  id: number;
  name: string;
  subdomain: string;
}

const LoginScreen: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await axios.get(Urls.getComapnies());
        const companiesData = res.data.data.map((item: any) => ({
          id: item.attributes.id,
          name: item.attributes.name,
          subdomain: item.attributes.subdomain,
        }));
        setCompanies(companiesData);
      } catch (e) {
        toast.error("Failed to fetch companies");
      }
    }
    fetchCompanies();
  }, []);

  const handleLogin = async (data: UserLogin) => {
    const hostParts = window.location.hostname.split(".");
    let subdomain: string | null = null;
    if (hostParts.length > 2) {
      subdomain = hostParts[0];
    }

    if (subdomain === null) {
      toast.error("Subdomain not set");
      return;
    }

    try {
      const response = await axios.post(Urls.login(), {
        user: data,
      });

      const token = response.headers["authorization"];
      if (token) {
        Cookies.set("jwtToken", token);
        const user = response.data.status.data.user;

        if (user?.role === "company" || user?.role === "candidate") {
          window.location.href = `http://${subdomain}.lvh.me:3000/home`;
        } else {
          window.location.href = `http://admin.lvh.me:3000/jobs`;
        }
      }
    } catch (e) {
      toast.error("Email or Password incorrect");
    }
  };

  return <LoginTemplate companies={companies} onLogin={handleLogin} />;
};

export default LoginScreen;
