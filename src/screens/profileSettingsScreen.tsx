import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import axios from "axios";
import ProfileSettings from "../components/organisms/profileSettings";
import { useUser } from "../context/userContext";
import { Urls } from "../utils/urls";

const ProfileSettingsScreen: React.FC = () => {
  const [initialName, setInitialName] = useState("");
  const [initialBio, setInitialBio] = useState("");
  const [initialLocation, setInitialLocation] = useState("");
  const navigate = useNavigate();
  const { user } = useUser();

  const hostParts = window.location.hostname.split(".");
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
          navigate("/error");
          return;
        }

        const res = await axios.get(
          Urls.fetchMe(`${subdomain}.`),
          {
            headers: { Authorization: `${jwtToken}` },
          },
        );

        const _user = res.data.data.attributes;
        console.log("hhhh");
        console.log(_user);
        setInitialName(_user.name || "");
        console.log(initialName);
        setInitialBio(_user.bio || "");
        setInitialLocation(_user.location || "");
      } catch (e) {
        navigate("/error");
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (
    name: string,
    bio: string,
    location: string,
    picture: File | null,
  ) => {
    const jwtToken = Cookies.get("jwtToken");
    if (!jwtToken) {
      navigate("/error");
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

      await axios.patch(Urls.updateProfile(""), formData, {
        headers: {
          Authorization: `${jwtToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (e) {
      navigate("/error");
    }
  };

  if (user?.role === "company" && subdomain !== user?.subdomain) {
    navigate("/error");
  }

  return (
    <ProfileSettings
      initialName={initialName}
      initialBio={initialBio}
      initialLocation={initialLocation}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/profile")}
    />
  );
};

export default ProfileSettingsScreen;
