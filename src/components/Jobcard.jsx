import React from "react";
import { Link } from "react-router-dom";

const getTypeColor = (type) => {
    switch (type) {
      case "full-time": return "bg-blue-100 text-blue-700";
      case "part-time": return "bg-purple-100 text-purple-700";
      case "remote": return "bg-green-100 text-green-700";
      case "internship": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

const Jobcard = ({ job }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-all">
      <h2 className="text-base font-semibold text-white">{job.title}</h2>
      <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center mb-2">
        <span className="font-bold text-blue-400 text-sm">{job.company?.charAt(0)}</span>
      </div>
      <p className="text-gray-400 text-sm">{job.company}</p>
      <p className="text-gray-400 text-sm">{job.location}</p>
      <p className="text-blue-400 text-sm font-medium">{job.jobType}</p>
      <Link
        className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        to={`/jobs/${job._id}`}
      >
        view details
      </Link>
    </div>
  );
};

export default Jobcard;
