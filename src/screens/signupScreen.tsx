import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Signup from "../components/organisms/signup";
import { Urls } from "../utils/urls";

export interface UserSignup {
  name: string;
  email: string;
  password: string;
  role: string;
  subdomain: string | null;
}

const SignupScreen: React.FC = () => {
  const [data, setData] = useState<UserSignup>({
    name: "",
    email: "",
    password: "",
    role: "",
    subdomain: null,
  });

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(Urls.signup(), {
        user: data,
      });
      const token = response.headers["authorization"];
      toast.success("Signed up successfully");

      if (token) {
        const role = response.data.data.role;
        if (role === "company") {
          window.location.href = `http://${data.subdomain}.lvh.me:3000/login`;
        } else {
          window.location.href = `http://lvh.me:3000/login`;
        }
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return <Signup data={data} onChange={handleChange} onSubmit={handleSubmit} />;
};

export default SignupScreen;
