import React from "react";
import { useUser } from "../../context/userContext";

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

interface UserListProps {
  users: User[];
  onDelete: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete }) => {
  const { user } = useUser();
  return (
    <div className="container mt-5">
      <h3 className="fw-bold text-primary mb-4">User List</h3>

      <div className="row">
        {users.map((_user) => {
          const disableDelete =
            _user.role === "admin" ||
            (_user.role !== "company" && user?.role === "company_manager") ||
            (_user.role !== "candidate" && user?.role === "user_manager");

          return (
            <div key={_user.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{_user.name || "No Name"}</h5>
                  <p className="card-text">
                    <strong>Email:</strong> {_user.email}
                    <br />
                    <strong>Role:</strong> {_user.role}
                  </p>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(_user.id)}
                    disabled={disableDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
