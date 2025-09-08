import React, {useEffect, useState} from 'react';
import JobsHeader from '../atoms/jobsHeader';
import JobsHome from '../organisms/jobsHome';
import UserProvider from '../../context/userContext';


const JobsHomeTemplate = () =>{


    return(
        <>
            <JobsHeader text = {"Jobs"}/>
            <JobsHome/>
        </>
    )

}



export default JobsHomeTemplate;




