import React, {useState} from 'react';
import { makeStyles } from "tss-react/mui";
import { theme } from '../../styles/style';



const useStyles = makeStyles()(() => ({
    topDivHeader:{
        minHeight: theme.heightWidth.divHeightpx,
    },
    bottomDivHeader : {
        minHeight: theme.heightWidth.divHeightper,
        width: theme.heightWidth.divWidht
    }
}));

interface headerProps{
    text : string;
}

const JobsHeader = ({text} : headerProps) => {
    const {classes} = useStyles();
    return (
        <div className={`container-fluid bg-black d-flex justify-content-center ${classes.topDivHeader}`} >
            <div className={`d-flex justify-content-center align-items-center ${classes.bottomDivHeader}`}>
                <p className="fs-1 fw-bold text-white text-center">
                    {text}
                </p>
            </div>
        </div>
    );
}







export default JobsHeader;