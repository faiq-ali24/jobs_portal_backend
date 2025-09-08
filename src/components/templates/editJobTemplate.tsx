import React, { useEffect, useState } from "react";
import { jobFormProps } from "../../interfaces/appInterface";
import JobForm from "../organisms/jobForm";
import { useNavigate, useParams } from "react-router-dom";

const EditJobTemplate = () => {
    const {id} = useParams<{ id: string }>()
    
    return(
        <>
            <p className="fs-1 fw-bold m-5">Edite the Job!</p>
            <JobForm id={Number(id)} />
        </>
    )
}



export default EditJobTemplate;