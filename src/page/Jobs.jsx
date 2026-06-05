import React, { useState, useEffect } from "react";
import Jobcard from "../components/Jobcard";
import api from "../api/axios";
import { useSearchParams } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  useEffect(() => {
    api.get("/jobs").then((res) => setJobs(res.data.data));
  }, []);

  const filtered = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2">
            Find Your <span className="text-blue-400">Dream Job</span> Now
          </h1>
          <p className="text-gray-400 text-base">Thousands of jobs for you to explore</p>
        </div>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search by title, company or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
            Search
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {["Remote", "HR", "Marketing", "Sales", "Software", "Fresher", "Analytics", "Full-time", "Internship", "Finance"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSearch(cat)}
              className="px-4 py-1.5 rounded-full border border-gray-600 text-gray-300 text-sm hover:border-blue-500 hover:text-blue-400 transition-all bg-gray-800"
            >
              {cat} ›
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((job) => (
              <Jobcard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
