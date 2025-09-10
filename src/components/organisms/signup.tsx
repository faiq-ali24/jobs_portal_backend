import React, { ChangeEvent, FormEvent } from "react";
import { UserSignup } from "../../interfaces/appInterface";

interface SignupProps {
  data: UserSignup;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Signup: React.FC<SignupProps> = ({ data, onChange, onSubmit }) => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <h2 className="text-center my-4">Get Started Now</h2>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter your name"
                value={data.name}
                onChange={onChange}
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
                placeholder="Enter your email"
                value={data.email}
                onChange={onChange}
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
                placeholder="Enter your password"
                value={data.password}
                onChange={onChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Sign up as</label>
              <select
                className="form-select"
                id="role"
                value={data.role}
                onChange={onChange}
              >
                <option value="">Select Role</option>
                <option value="candidate">Candidate</option>
                <option value="company">Company</option>
              </select>
            </div>

            {data.role === "company" && (
              <div className="mb-3">
                <label htmlFor="subdomain" className="form-label">
                  Subdomain
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="subdomain"
                  placeholder="Enter your company subdomain"
                  value={data.subdomain ? data.subdomain : ""}
                  onChange={onChange}
                />
              </div>
            )}

            <button type="submit" className="btn btn-success w-100">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
