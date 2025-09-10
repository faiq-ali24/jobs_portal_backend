import React, { useEffect, useState } from "react";

interface ProfileSettingsProps {
  initialName: string;
  initialBio: string;
  initialLocation: string;
  onSubmit: (
    name: string,
    bio: string,
    location: string,
    picture: File | null,
  ) => void;
  onCancel: () => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  initialName,
  initialBio,
  initialLocation,
  onSubmit,
  onCancel,
}) => {
  const [name, setName] = useState<string>(initialName);
  const [bio, setBio] = useState<string>(initialBio);
  const [location, setLocation] = useState<string>(initialLocation);
  const [picture, setPicture] = useState<File | null>(null);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  useEffect(() => {
    setBio(initialBio);
  }, [initialBio]);

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(name, bio, location, picture);
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
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
