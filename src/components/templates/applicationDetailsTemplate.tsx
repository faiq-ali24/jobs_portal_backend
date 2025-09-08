import React, { useEffect, useState } from "react";
import axios from "axios";
import { applicationDetailsProps } from "../../interfaces/appInterface";
import JobsHeader from "../atoms/jobsHeader";
import ApplicationDetails from "../organisms/applicationDetails";
import { useParams } from "react-router-dom";
import UserProvider from "../../context/userContext";


const ApplicationDetailsTemplate = () =>{
    const { job_id, id } = useParams<{ job_id: string; id: string }>();

    return(
        <>
            <JobsHeader text="Application" />
            <ApplicationDetails jobId={Number(job_id)} id={Number(id)} />
        </>
    )
}


export default ApplicationDetailsTemplate;