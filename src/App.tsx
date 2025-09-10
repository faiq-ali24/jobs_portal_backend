import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Signup from "./components/organisms/signup";
import Login from "./components/organisms/login";
import JobsHeader from "./components/atoms/jobsHeader";
import JobsCard from "./components/molecules/jobsCard";
import JobForm from "./components/organisms/jobForm";
import ApplicationForm from "./components/organisms/applicationForm";
import JobDetails from "./components/organisms/jobDetails";
import LoginScreen from "./screens/loginScreen";
import SignupScreen from "./screens/signupScreen";
import JobDetailsTemplate from "./components/templates/jobDetailsTemplate";
import ApplicationsHome from "./components/organisms/applicationsHome";
import ApplicationsHomeTemplate from "./components/templates/applicationsHomeTemplate";
import ApplicationDetails from "./components/organisms/applicationDetails";
import ApplicationDetailsTemplate from "./components/templates/applicationDetailsTemplate";
import GuestNav from "./navbar/guestNav";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/organisms/profile";
import ProfileSettings from "./components/organisms/profileSettings";
import AllApplicationsTemplate from "./components/templates/allApplicationsTemplate";
import { ToastContainer } from "react-toastify";
import PasswordUpdate from "./components/organisms/passwordUpdate";
import UserProvider from "./context/userContext";
import CreateUser from "./components/organisms/createUser";
import UserListTemplate from "./components/templates/userListTemplate";
import WentWrongScreen from "./screens/wentWrongScreen";
import HomeScreen from "./screens/homeScreen";
import JobsDetailsScreen from "./screens/jobsDetailsScreen";
import ProfileScreen from "./screens/profileScreen";
import PasswordUpdateScreen from "./screens/passwordUpdateScreen";
import ProfileSettingsScreen from "./screens/profileSettingsScreen";
import AllApplicationsScreen from "./screens/allApplicationsScreen";
import UserListScreen from "./screens/userListScreen";
import EditJobScreen from "./screens/editJobScreen";
import ApplicationsHomeScreen from "./screens/applicationsHomeScreen";
import ApplicationDetailsScreen from "./screens/applicationDetailsScreen";
import JobsHomeScreen from "./screens/JobsHomeScreen";
import AddJobScreen from "./screens/addJobScreen";
import AddApplicationScreen from "./screens/addApplicationScreen";
import CreateUserScreen from "./screens/createUserScreen";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <GuestNav />
          <Routes>
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/jobs" element={<JobsHomeScreen />} />
            <Route path="/jobs/:id" element={<JobsDetailsScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/change_password" element={<PasswordUpdateScreen />} />
            <Route
              path="/profile/settings"
              element={<ProfileSettingsScreen />}
            />
            <Route path="/create_user" element={<CreateUserScreen />} />
            <Route
              path="/all_applications"
              element={<AllApplicationsScreen />}
            />
            <Route path="/users" element={<UserListScreen />} />
            {/* company: */}
            <Route path="/jobs/:id/edit" element={<EditJobScreen />} />
            <Route
              path="/jobs/:job_id/applications"
              element={<ApplicationsHomeScreen />}
            />
            <Route
              path="/jobs/:job_id/applications/:id"
              element={<ApplicationDetailsScreen />}
            />
            <Route path="/jobs/new" element={<AddJobScreen />} />
            {/* candidate: */}
            <Route
              path="/jobs/:job_id/new_application"
              element={<AddApplicationScreen />}
            />
            <Route path="/error" element={<WentWrongScreen />} />
          </Routes>
          <ToastContainer position="top-right" autoClose={1500} />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
