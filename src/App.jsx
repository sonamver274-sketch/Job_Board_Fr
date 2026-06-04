import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import JobDetail from "./page/Jobdetail";
import Dashboard from "./page/Dashboard";
import Jobs from "./page/Jobs";
import MyApplications from "./page/MyApplications";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";
import { AuthProvider } from "./context/Auth.context";

function App() {
  return <>
   <AuthProvider>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/dashboard" element={
          <ProtectedRoute role="employer">
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/my-applications" element={
          <ProtectedRoute role="jobSeeker">
            <MyApplications />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
   </AuthProvider>
  </>;
}

export default App;
