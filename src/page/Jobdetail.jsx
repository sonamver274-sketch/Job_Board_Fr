import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/Auth.context";
import { useParams } from "react-router-dom";

const Jobdetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    api.get("/jobs/" + id).then((res) => setJob(res.data.data));
  }, [id]);

  const handleApply = async () => {
    try {
      await api.post("/applicant/" + id + "/apply");
      setApplied(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  if (!job) {
    return "job detail missing";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
        <p className="text-gray-500 font-medium mb-1">{job.company}</p>
        <p className="text-gray-400 text-sm mb-1">{job.location}</p>
        <p className="text-gray-400 text-sm mb-1">{job.jobType}</p>
        <p className="text-gray-700 mt-4 leading-relaxed">{job.description}</p>

        {user &&
          user.role === "jobSeeker" &&
          (applied ? (
            <p className="mt-6 text-green-600 font-semibold">Applied!</p>
          ) : (
            <button
              onClick={handleApply}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
            >
              Apply
            </button>
          ))}
      </div>
    </div>
  );
};

export default Jobdetail;
