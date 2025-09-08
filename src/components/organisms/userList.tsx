import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { User, convertUsersList } from "../../converter/modelConverter";

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          alert("Authorization token missing");
          return;
        }

        const res = await axios.get("http://admin.lvh.me:3001/api/v1/users/get_all", {
          headers: { Authorization: `${jwtToken}` },
        });

        setUsers(convertUsersList(res.data.data));
      } 
      catch (e) {
        console.error("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      if (!jwtToken) {
        alert("Authorization token missing");
        return;
      }

      await axios.delete(`http://admin.lvh.me:3001/api/v1/users/${id}`, {
        headers: { Authorization: `${jwtToken}` },
      });

      setUsers(users.filter((user) => user.id !== id));
    } 
    catch (e) {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="fw-bold text-primary mb-4">User List</h3>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{user.name || "No Name"}</h5>
                <p className="card-text">
                  <strong>Email:</strong> {user.email}
                  <br />
                  <strong>Role:</strong> {user.role}
                </p>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
                  disabled={user.role === "admin"}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
