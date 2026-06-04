import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/Auth.context";
import { useParams } from "react-router-dom";

const Jobdetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [applyError, setApplyError] = useState("");

  useEffect(() => {
    api.get("/jobs/" + id).then((res) => setJob(res.data.data));

  }, [id]);

  useEffect(() => {
    if (user && user.role === "jobSeeker") {
      api.get("/applicant/my")
        .then((res) => {
          const alreadyApplied = res.data.data.some((app) => app.job._id === id);
          if (alreadyApplied) setApplied(true);
        })
        .catch(() => {});
    }
  }, [id]);

  const handleApply = async () => {
    try {
      await api.post("/applicant/" + id + "/apply");
      setApplied(true);
    } catch (error) {
      setApplyError("Already applied or something went wrong.");
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

        {user && user.role === "jobSeeker" && (
          applied ? (
            <p className="mt-6 text-green-600 font-semibold">Applied Successfully!</p>
          ) : (
            <>
              <button
                onClick={handleApply}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-medium"
              >
                Apply
              </button>
              {applyError && <p className="mt-2 text-red-500 text-sm">{applyError}</p>}
            </>
          )
        )}
      </div>
    </div>
  );
};

export default Jobdetail;
