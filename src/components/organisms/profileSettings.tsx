import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../context/userContext";
import Cookies from "js-cookie";

const ProfileSettings = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const {user} = useUser();
  const navigate = useNavigate();
  const hostParts = window.location.hostname.split('.');
  let subdomain: string | null = null;

  if (hostParts.length > 2) {
    const sub = hostParts[0];
    if (sub) subdomain = sub; 
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          alert("Authorization token missing");
          return;
        }

        const res = await axios.get(`http://${subdomain}.lvh.me:3001/api/v1/me`, {
          headers: {
            Authorization: `${jwtToken}`,
          },
        });

        const _user = res.data.data.attributes;
        setName(_user.name || "");
        setBio(_user.bio || "");
        setLocation(_user.location || "");
      } 
      catch (e) {
        alert("Error occured on fetching user");
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      alert("Authorization token missing");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("user[name]", name);
      formData.append("user[bio]", bio);
      formData.append("user[location]", location);
      if (picture) {
        formData.append("user[picture]", picture);
      }

      await axios.patch("http://lvh.me:3001/signup", formData, {
        headers: {
          Authorization: `${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (e) {
      alert("Error occured updating profile.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <h3 className="mb-4">Edit Profile</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Bio</label>
            <textarea
              className="form-control"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Profile Picture</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setPicture(e.target.files?.[0] || null)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Save Changes
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

export default ProfileSettings;
