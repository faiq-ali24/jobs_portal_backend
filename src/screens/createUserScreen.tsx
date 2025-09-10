import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useUser } from "../context/userContext";
import { Urls } from "../utils/urls";

interface CreateUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

const CreateUserScreen = () => {
  const [data, setData] = useState<CreateUser>({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const { user } = useUser();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const token = Cookies.get("jwtToken");
      const response = await axios.post(
        Urls.signup(),
        { user: data },
        { headers: { Authorization: `${token}` } },
      );
      toast.success("User created successfully!");
      window.history.back();
    } catch (_e) {
      navigate("/error");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <h2 className="text-center my-4">Create User</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter user name"
                value={data.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter user email"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter user password"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                id="role"
                value={data.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="user_manager">User Manager</option>
                <option value="company_manager">Company Manager</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Create User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserScreen;
