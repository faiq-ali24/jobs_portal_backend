

import React, {useState, ChangeEvent} from 'react';
import axios from 'axios'
import { UserSignup } from '../../interfaces/appInterface';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';






const Signup = () => {
  const [data, setData] = useState<UserSignup>({
    name: "", email: "",password: "",role: ""
  });
  const navigate = useNavigate();
  const handleChange = (e : ChangeEvent< HTMLInputElement | HTMLSelectElement>) => {
    const {id, value} = e.target
    setData({...data, [id]:value})
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    try{
      const response = await axios.post(
        'http://lvh.me:3001/signup',
        {user: data}
      );
      console.log("Full response:", response);

      const token = response.headers['authorization'];
      toast.success("Signed up successfully!");
      
      if(token){
        Cookies.set("jwtToken", token, {
                  domain: "lvh.me", 
                  sameSite: "Lax", 
                  secure: false,
                });
                
        const user = response.data.data.id;
        const role = response.data.data.role
        if (role === "company") {
          const subdomain = user;
          window.location.href = `http://${subdomain}.lvh.me:3000/home`;
        }
        else if(role === "candidate"){
          window.location.href = `http://lvh.me:3000/home`;
        }
      }
    }
    catch(e){
      toast.error("Sign up failed!");
    }

  }


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <h2 className="text-center my-4">Get Started Now</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                placeholder="Enter your name" 
                value={data.name}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Enter your email" 
                value={data.email}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Enter your password" 
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Sign up as</label>
              <select 
                className="form-select" 
                id="role" 
                value={data.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="candidate">Candidate</option>
                <option value="company">Company</option>
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}



export default Signup;