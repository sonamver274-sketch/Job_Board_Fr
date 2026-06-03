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
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Applications</h1>

        {applications.length === 0 ? (
          // agar koi application nahi hai
          <p className="text-gray-400 text-center mt-20">You have not applied to any job yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {applications.map((app) => (
              <div key={app._id} className="bg-white rounded-xl shadow p-5 flex justify-between items-center">
                <div>
                  {/* job ka title aur company */}
                  <h2 className="text-lg font-semibold text-gray-800">{app.job.title}</h2>
                  <p className="text-gray-500 text-sm">{app.job.company} • {app.job.location}</p>
                </div>
                {/* application ka status - pending/accepted/rejected */}
                <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
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
