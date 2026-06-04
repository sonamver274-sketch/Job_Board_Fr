import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../context/Auth.context";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "", company: "", location: "", jobType: "full-time", description: ""
  });

  const { user } = useAuth();

  const fetchJobs = () => {
    api.get("/jobs").then((res) => {
      const myJobs = res.data.data.filter((job) => job.employer === user._id);
      setJobs(myJobs);
    });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (selectedJobId) {
      api.get("/applicant/" + selectedJobId + "/applications")
        .then((res) => setApplications(res.data.data)).catch(() => setApplications([]));;
    }
  }, [selectedJobId]);

  const handleDeleteJob = async (jobId) => {
    try {
      await api.delete("/jobs/" + jobId);
      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      if (selectedJobId === jobId) setSelectedJobId(null);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateStatus = async (appId, status) => {
    try {
      await api.put("/applicant/" + appId + "/status", { status });
      setApplications((prev) =>
        prev.map((app) => app._id === appId ? { ...app, status } : app)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePostJob = async () => {
    try {
      await api.post("/jobs", formData);
      setShowForm(false);
      setFormData({ title: "", company: "", location: "", jobType: "full-time", description: "" });
      fetchJobs();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="bg-gray-950 max-w-6xl mx-auto rounded-xl p-6">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">My Jobs</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-medium"
        >
          + Post New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-gray-800 rounded-xl border border-gray-700 p-5">
            <h3 className="text-lg font-semibold text-white">{job.title}</h3>
            <p className="text-gray-400 text-sm mb-4">{job.company}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedJobId(job._id)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm font-medium"
              >
                View Applicants
              </button>
              <button
                onClick={() => handleDeleteJob(job._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedJobId && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold text-white mb-4">Applicants</h3>
          {applications.length === 0 ? (
            <p className="text-gray-500">No applicants yet.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {applications.map((app) => (
                <div key={app._id} className="bg-gray-800 rounded-xl border border-gray-700 p-5 flex flex-wrap justify-between items-center gap-3">
                  <p className="text-white font-medium">{app.applicant.name}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm px-3 py-1 rounded-full font-medium
                      ${app.status === "accepted" ? "bg-green-900 text-green-400" :
                        app.status === "rejected" ? "bg-red-900 text-red-400" :
                        "bg-blue-900 text-blue-400"}`}>
                      {app.status}
                    </span>
                    {app.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(app._id, "accepted")}
                          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(app._id, "rejected")}
                          className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Post New Job</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-200 text-2xl">✕</button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-300">Job Title</label>
                <input
                  className="bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Frontend Developer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-300">Company</label>
                <input
                  className="bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Tech Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-gray-300">Location</label>
                  <input
                    className="bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. Delhi"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <label className="text-sm font-medium text-gray-300">Job Type</label>
                  <select
                    className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.jobType}
                    onChange={(e) => setFormData({ ...formData, jobType: e.target.value })}
                  >
                    <option value="full-time">Full Time</option>
                    <option value="part-time">Part Time</option>
                    <option value="remote">Remote</option>
                    <option value="internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-300">Description</label>
                <textarea
                  className="bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={4}
                  placeholder="Describe the role..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePostJob}
                  className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Post Job
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
    </div>
  );
};

export default Dashboard;
