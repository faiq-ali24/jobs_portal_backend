import React, { useEffect } from "react";
import JobHeader from "../atoms/jobsHeader";
import JobDetails from "../organisms/jobDetails";
import UserProvider from "../../context/userContext";
import { jobDetailsProps } from "../../interfaces/appInterface";
import { useParams } from "react-router-dom";


const JobDetailsTemplate = () => {
    const { id } = useParams<{ id: string }>();
    return(
        <>
            <JobHeader text="Apply now!" />
            <JobDetails id={Number(id)}/>
        </>
    )
}


export default JobDetailsTemplate;