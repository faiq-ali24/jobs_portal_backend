import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './components/organisms/signup';
import Login from './components/organisms/login';
import JobsHeader from './components/atoms/jobsHeader';
import JobsCard from './components/molecules/jobsCard';
import { jobProps } from './components/molecules/jobsCard';
import JobsHome from './components/organisms/jobsHome';
import JobForm from './components/organisms/jobForm';
import ApplicationForm from './components/organisms/applicationForm';
import JobDetails from './components/organisms/jobDetails';
import LoginScreen from './screens/loginScreen';
import SignupScreen from './screens/signupScreen';
import JobDetailsTemplate from './components/templates/jobDetailsTemplate';
import AddJobTemplate from './components/templates/addJobTemplate';
import EditJobTemplate from './components/templates/editJobTemplate';
import ApplicationsHome from './components/organisms/applicationsHome';
import ApplicationsHomeTemplate from './components/templates/applicationsHomeTemplate';
import ApplicationDetails from './components/organisms/applicationDetails';
import ApplicationDetailsTemplate from './components/templates/applicationDetailsTemplate';
import GuestNav from './navbar/guestNav';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobsHomeTemplate from './components/templates/jobsHomeTemplate';
import ApplicationFormTemplate from './components/templates/applicationFormTemplate';
import Profile from './components/organisms/profile';
import ProfileSettings from './components/organisms/profileSettings';
import AllApplicationsTemplate from './components/templates/allApplicationsTemplate';
import { ToastContainer } from 'react-toastify';
import PasswordUpdate from './components/organisms/passwordUpdate';
import UserProvider from './context/userContext';
import CreateUser from './components/organisms/createUser';
import HomeTemplate from './components/templates/homeTemplate';
import UserListTemplate from './components/templates/userListTemplate';


function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
            <GuestNav />
            <Routes>
              <Route path="/home" element={<HomeTemplate />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/signup" element={<SignupScreen />} />
              <Route path="/jobs" element={<JobsHomeTemplate />} />
              <Route path="/jobs/:id" element={<JobDetailsTemplate />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change_password" element={<PasswordUpdate />} />
              <Route path="/profile/settings" element={<ProfileSettings />}/>
              <Route path="/create_user" element={<CreateUser />}/>
              <Route path="/all_applications" element={<AllApplicationsTemplate/>} />
              <Route path="/users" element={<UserListTemplate />} />
              {/* company: */}
              <Route path="/jobs/:id/edit" element={<EditJobTemplate />}/>
              <Route path="/jobs/:job_id/applications" element={<ApplicationsHomeTemplate />} />
              <Route path="/jobs/:job_id/applications/:id" element={<ApplicationDetailsTemplate />}/>
              <Route path="/jobs/new" element={<AddJobTemplate />}/>
              {/* candidate: */}
              <Route path="/jobs/:job_id/new_application" element={<ApplicationFormTemplate />}/>

            </Routes>
          <ToastContainer position="top-right" autoClose={1500} />
            </div>
          </Router>
        </UserProvider>
  );
}

export default App;
