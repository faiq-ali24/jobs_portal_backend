import Input from '@mui/material/Input';
import React, {useState} from 'react';
import { makeStyles } from "tss-react/mui";
import { salaries, cities } from "../organisms/jobsHome"
import { filterProps } from '../../interfaces/appInterface';
import { toast } from 'react-toastify';
import { theme } from '../../styles/style';


const useStyles = makeStyles()(() => ({
    searchForm:{
        maxWidth: theme.searchWidth.mxWidth,
    },
}));


const JobsFilter = ({location, salary, title, setLocation, setSalary, setTitle} : filterProps) => {
    const [thisLocation, setThisLocation] = useState<string>("");
    const [thisSalary, setThisSalary] = useState<number>(0);
    const [thisTitle, setThisTitle] = useState<string>("");
    const {classes} = useStyles();


    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        setLocation(thisLocation);
        setSalary(thisSalary);
        setTitle(thisTitle);
        toast.success("Filtered successfully!");
    }

    return(
        
        <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <form>
                    <div className="input-group mb-3">
                        <select className={`form-select ${classes.searchForm}`} value={thisLocation} onChange={(e) => setThisLocation(e.target.value)}>
                            <option value="">Location</option>
                            {cities.map((loc, index) => (
                                <option key={index} value={loc}>{loc}</option>
                            ))}
                        </select>
                        <select className={`form-select ${classes.searchForm}`} value={thisSalary} onChange={(e) => setThisSalary(Number(e.target.value))} >
                                <option value="">Salary</option>
                                {
                                    salaries.map((sal, index) => (<option key={index} value={sal}> {sal} </option>))
                                }
                        </select>

                        <Input type="text" className="form-control" placeholder="Search by title..." value={thisTitle} onChange={(e) => setThisTitle(e.target.value)} />
                        <button className="btn btn-primary" onClick={(e) => {handleSubmit(e)}}>Search</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )

}





export default JobsFilter;