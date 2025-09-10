import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userProfile } from "../interfaces/appInterface";
import { useUser } from "../context/userContext";
import Cookies from "js-cookie";

const GuestNav = () => {
  const navigate = useNavigate();
  const token = Cookies.get("jwtToken");
  const { user } = useUser();
  const hostParts = window.location.hostname.split(".");
  let subdomain: string | null = null;

  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub;
  }
  const handleLogout = () => {
    const jwtToken = Cookies.get("jwtToken");
    axios.delete(`http://lvh.me:3001/logout`, {
      headers: { Authorization: `${jwtToken}` },
    });
    Cookies.remove("jwtToken");
    window.location.href = `http://lvh.me:3000/login`;
  };

  return (
    <nav className="navbar bg-dark navbar-expand-lg navbar-dark">
      <div className="container">
        <img src="./job.svg" height="30" alt="Logo" loading="lazy" />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse mx-4"
          id="navbarButtonsExample"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {user?.role == "candidate" ? (
                <a
                  className="nav-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = subdomain
                      ? `http://${subdomain}.lvh.me:3000/home`
                      : `http://lvh.me:3000/home`;
                  }}
                >
                  Home
                </a>
              ) : user?.role == "company" ? (
                <a
                  className="nav-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `http://${subdomain}.lvh.me:3000/home`;
                  }}
                >
                  Home
                </a>
              ) : null}
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {!token ? (
              <>
                <Link to="/login" className="btn btn-link px-3 me-2">
                  Login
                </Link>
                <a
                  className="btn btn-primary me-3"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = `http://lvh.me:3000/signup`;
                  }}
                >
                  Sign Up
                </a>
              </>
            ) : (
              <>
                {subdomain !== null || user?.role !== "candidate" ? (
                  <>
                    <a
                      className="btn btn-info mx-2"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (user?.role === "candidate") navigate("/jobs");
                        else if (user?.role === "company")
                          window.location.href = `http://${subdomain}.lvh.me:3000/jobs`;
                        else
                          window.location.href = `http://admin.lvh.me:3000/jobs`;
                      }}
                    >
                      Jobs
                    </a>

                    <a
                      className="btn btn-primary mx-2"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (user?.role === "candidate")
                          navigate("/all_applications");
                        else if (user?.role === "company")
                          window.location.href = `http://${subdomain}.lvh.me:3000/all_applications`;
                        else
                          window.location.href = `http://admin.lvh.me:3000/all_applications`;
                      }}
                    >
                      Applications
                    </a>
                  </>
                ) : null}

                {user?.role === "admin" ? (
                  <a
                    className="btn btn-primary mx-2"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = `http://admin.lvh.me:3000/create_user`;
                    }}
                  >
                    Create user
                  </a>
                ) : null}

                {user?.role == "admin" ||
                user?.role == "user_manager" ||
                user?.role == "company_manager" ? (
                  <div>
                    <a
                      className="btn btn-primary mx-2"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `http://admin.lvh.me:3000/users`;
                      }}
                    >
                      Users
                    </a>
                  </div>
                ) : null}

                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle me-2"
                    type="button"
                    id="profileDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {"Profile"}
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="profileDropdown"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (user?.role === "candidate") navigate("/profile");
                          else if (user?.role === "company")
                            window.location.href = `http://${subdomain}.lvh.me:3000/profile`;
                          else
                            window.location.href = `http://admin.lvh.me:3000/profile`;
                        }}
                      >
                        My Profile
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          if (user?.role === "candidate")
                            navigate("/change_password");
                          else if (user?.role === "company")
                            window.location.href = `http://${subdomain}.lvh.me:3000/change_password`;
                          else
                            window.location.href = `http://admin.lvh.me:3000/change_password`;
                        }}
                      >
                        Change Password
                      </a>
                    </li>
                    <li>
                      <button
                        className="dropdown-item text-danger"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GuestNav;
