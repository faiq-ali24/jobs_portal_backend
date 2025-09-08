import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userProfile } from "../../interfaces/appInterface";
import { useUser } from "../../context/userContext";
import Cookies from "js-cookie";

const Profile = () => {
  const [_user, setUser] = useState<userProfile | null>(null);
  const navigate = useNavigate();
  const {user} = useUser(); 
  const hostParts = window.location.hostname.split('.');
  let subdomain: string | null = null;

  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub; 
  }
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          alert("Authorization token missing");
          return;
        }
        const res = await axios.get(`http://${subdomain}.lvh.me:3001/api/v1/me`, {
          headers: { Authorization: `${jwtToken}` },
        });
        const data = res.data.data.attributes;
        setUser({
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role,
          location: data.location,
          bio: data.bio,
          picture: data.picture,
        });
      } 
      catch (e) {
        alert("Error occurred");
      }
    }
    fetchUserDetails();
  }, []);

  if (!_user) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading profile...</h3>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={
              _user.picture
                ? `http://${subdomain}.lvh.me:3001${_user.picture}`
                : "./job-search.png"
            }
            alt="Profile"
            className="rounded-circle me-3"
            width="100"
            height="100"
          />
          <div>
            <h4>{_user.name || "No Name Provided"}</h4>
            <p className="text-muted">{_user.email}</p>
          </div>
        </div>

        <hr />

        <div>
          <p>
            <strong>Role:</strong> {_user.role}
          </p>
          <p>
            <strong>Location:</strong> {_user.location || "Not specified"}
          </p>
          <p>
            <strong>Bio:</strong> {_user.bio || "No bio available"}
          </p>
        </div>

        <div className="mt-3 text-center">
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/profile/settings")}
          >
            Profile Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
