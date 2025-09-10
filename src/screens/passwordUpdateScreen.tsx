import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import PasswordUpdate from "../components/organisms/passwordUpdate";
import { Urls } from "../utils/urls";

const PasswordUpdateScreen: React.FC = () => {
  const navigate = useNavigate();

  const hostParts = window.location.hostname.split(".");
  let subdomain: string | null = null;

  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub;
  }

  const handlePasswordUpdate = async (
    currentPassword: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/error");
      return;
    }

    try {
      await axios.patch(
        Urls.updateProfile(`${subdomain}.`),
        {
          user: {
            current_password: currentPassword,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        },
      );

      Cookies.remove("jwtToken");
      window.location.href = `http://${subdomain}.lvh.me:3000/login`;
      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (e) {
      toast.error("Password invalid.")
    }
  };

  return (
    <PasswordUpdate
      onSubmit={handlePasswordUpdate}
      onCancel={() => navigate("/profile")}
    />
  );
};

export default PasswordUpdateScreen;
