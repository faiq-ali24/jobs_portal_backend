import React, { useState } from "react";
import JobsHeader from "../atoms/jobsHeader";
import ApplicationForm from "../organisms/applicationForm";
import { useParams } from "react-router-dom";


const ApplicationFormTemplate = () => {
    const {job_id} = useParams<{job_id : string}>()
    return(
        <>
            <JobsHeader text="Apply for job!" />
            <ApplicationForm job_id={Number(job_id)}/>
        </>
    )
}

export default ApplicationFormTemplate;