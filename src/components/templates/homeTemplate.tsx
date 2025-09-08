import React, { useEffect, useState } from "react";
import CandidatesHome from "../organisms/candidatesHome";
import JobsHeader from "../atoms/jobsHeader";
import { useUser } from "../../context/userContext";
import CompaniesHome from "../organisms/companiesHome";



const HomeTemplate = () => {
    const {user} = useUser();
    return(
        <>
            <JobsHeader text="Dashboard" />
            {
                (user?.role === "candidate") ? 
                <CandidatesHome />
                :
                (user?.role === "company") ? 
                <CompaniesHome />
                : null
            }
        </>
    )
}


export default HomeTemplate;