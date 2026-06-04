import React, { useState, useEffect } from "react";
import api from "../api/axios";

const MyApplications = () => {
  // applications mein saari applied jobs store hongi
  const [applications, setApplications] = useState([]);

  // page load hone par backend se data fetch karo
  useEffect(() => {
    api.get("/applicant/my").then((res) => {
      setApplications(res.data.data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">My Applications</h1>

        {applications.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">You have not applied to any job yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {applications.map((app) => (
              <div key={app._id} className="bg-gray-800 rounded-xl border border-gray-700 p-5 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-white">{app.job.title}</h2>
                  <p className="text-gray-400 text-sm">{app.job.company} • {app.job.location}</p>
                </div>
                <span className={`text-sm px-3 py-1 rounded-full font-medium
                  ${app.status === "accepted" ? "bg-green-900 text-green-400" :
                    app.status === "rejected" ? "bg-red-900 text-red-400" :
                    "bg-blue-900 text-blue-400"}`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
