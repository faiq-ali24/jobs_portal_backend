import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Profile from "../components/organisms/profile";
import { useUser } from "../context/userContext";
import { Urls } from "../utils/urls";

export interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  role: string;
  location: string | null;
  bio: string | null;
  picture: string | null;
}

const ProfileScreen: React.FC = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  const { user } = useUser();

  const hostParts = window.location.hostname.split(".");
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
          navigate("/error");
          return;
        }
        const res = await axios.get(
          Urls.fetchMe(`${subdomain}.`),
          {
            headers: { Authorization: `${jwtToken}` },
          },
        );

        const data = res.data.data.attributes;
        setUserData({
          id: data.id,
          email: data.email,
          name: data.name,
          role: data.role,
          location: data.location,
          bio: data.bio,
          picture: data.picture,
        });
      } catch (e) {
        navigate("/error");
      }
    }
    fetchUserDetails();
  }, []);

  if (!userData) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading profile...</h3>
      </div>
    );
  }

  return (
    <Profile
      user={userData}
      subdomain={subdomain}
      onEditProfile={() => navigate("/profile/settings")}
    />
  );
};

export default ProfileScreen;
