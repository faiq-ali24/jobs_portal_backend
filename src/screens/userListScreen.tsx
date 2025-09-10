import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { convertUsersList } from "../converter/modelConverter";
import UserListTemplate from "../components/templates/userListTemplate";
import type { User } from "../components/organisms/userList";
import { Urls } from "../utils/urls";
import { toast } from "react-toastify";

const UserListScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");
        if (!jwtToken) {
          navigate("/error");
          return;
        }

        const res = await axios.get(
          Urls.fetchAllUsers(),
          { headers: { Authorization: `${jwtToken}` } },
        );

        setUsers(convertUsersList(res.data.data));
      } catch (e) {
        console.error("Error fetching users", e);
        navigate("/error");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const jwtToken = Cookies.get("jwtToken");
      if (!jwtToken) {
        navigate("/error");
        return;
      }

      await axios.delete(Urls.deleteUser(String(id)), {
        headers: { Authorization: `${jwtToken}` },
      });

      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (e) {
      toast.error("Error deleting user.");
    }
  };

  return <UserListTemplate users={users} onDelete={handleDelete} />;
};

export default UserListScreen;
