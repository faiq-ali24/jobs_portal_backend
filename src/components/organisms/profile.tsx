import React from "react";

export interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  role: string;
  location: string | null;
  bio: string | null;
  picture: string | null;
}

interface ProfileProps {
  user: UserProfile;
  subdomain: string | null;
  onEditProfile: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  subdomain,
  onEditProfile,
}) => {
  return (
    <div className="container mt-5">
      <div className="card shadow-sm p-4">
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={
              user.picture
                ? `http://${subdomain}.lvh.me:3001${user.picture}`
                : "./job-search.png"
            }
            alt="Profile"
            className="rounded-circle me-3"
            width="100"
            height="100"
          />
          <div>
            <h4>{user.name || "No Name Provided"}</h4>
            <p className="text-muted">{user.email}</p>
          </div>
        </div>

        <hr />

        <div>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Location:</strong> {user.location || "Not specified"}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio || "No bio available"}
          </p>
        </div>

        <div className="mt-3 text-center">
          <button className="btn btn-outline-primary" onClick={onEditProfile}>
            Profile Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
