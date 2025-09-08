import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PasswordUpdate = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      alert("Authorization token missing");
      return;
    }

    try {
      const res = await axios.patch(
        "http://lvh.me:3001/signup",
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
        }
      );
      Cookies.remove("jwtToken", { path: "/", domain: ".lvh.me" });
      window.location.href = `http://lvh.me:3000/login`;
      toast.success("Password updated successfully!");
      navigate("/login");
    } 
    catch (e) {
      alert("Error occured updating password.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h3 className="mb-4">Change Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordUpdate;
