import React, { useEffect, useState } from "react";
import { applicationsHomeProps } from "../../interfaces/appInterface";
import JobsHeader from "../atoms/jobsHeader";
import ApplicationsHome from "../organisms/applicationsHome";
import { useParams } from "react-router-dom";




const ApplicationsHomeTemplate = () =>{
    const { job_id } = useParams<{ job_id: string }>();
    return(
        <>
            <JobsHeader text={"Applications:" } />
            <ApplicationsHome jobId={Number(job_id)} />
        
        </>
    )

}


export default ApplicationsHomeTemplate;