import React from "react";
import UserList, { User } from "../organisms/userList";
import JobsHeader from "../atoms/jobsHeader";

interface UserListTemplateProps {
  users: User[];
  onDelete: (id: string) => void;
}

const UserListTemplate: React.FC<UserListTemplateProps> = ({
  users,
  onDelete,
}) => {
  return (
    <>
      <JobsHeader text="Users:" />
      <UserList users={users} onDelete={onDelete} />
    </>
  );
};

export default UserListTemplate;
