import React, { useEffect, useState } from "react";
import UserList from "../organisms/userList";
import JobsHeader from "../atoms/jobsHeader";


const UserListTemplate = () => {
    return(
        <>
            <JobsHeader text="Users:" />
            <UserList />
        </>
    )
}


export default UserListTemplate;