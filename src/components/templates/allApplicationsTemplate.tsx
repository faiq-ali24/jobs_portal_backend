import React, { useEffect, useState } from "react";
import JobsHeader from "../atoms/jobsHeader";
import AllApplications from "../organisms/allApplications";



const AllApplicationsTemplate = () => {
    return(
        <>
            <JobsHeader text={"Your Applications:" } />
            <AllApplications />
        </>
    )
}


export default AllApplicationsTemplate;