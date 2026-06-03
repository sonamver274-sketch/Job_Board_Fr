import React from "react";
import { useState, useEffect } from "react";
import Jobcard from "../components/Jobcard";
import api from "../api/axios";

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then((res) => setJobs(res.data.data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="text-center mb-10">
        {" "}
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Find Your <span className="text-blue-600">Dream Job </span> Today
        </h1>
        <p className="text-lg text-gray-500">
          Connect with top employer and discover opportunity that match your
          skills and ambitions
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Start your carrer journey with jobflow
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Jobcard key={job._id} job={job} />
        ))}{" "}
      </div>
    </div>
  );
};

export default Home;
