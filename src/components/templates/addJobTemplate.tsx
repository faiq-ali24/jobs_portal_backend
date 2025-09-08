import React, { useEffect, useState } from "react";
import JobForm from "../organisms/jobForm";

const AddJobTemplate = () => {
    return(
        <>
            <p className="fs-1 fw-bold m-5">Add a Job!</p>
            <JobForm id={null} />
        </>
    )
}



export default AddJobTemplate;