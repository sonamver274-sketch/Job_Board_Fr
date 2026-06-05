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

    const timeAgo = (date)=>{
  const days = Math.floor((new Date()-new Date(date)) /  (1000 * 60 * 60 * 24));
  if ( days===0)  return "today"
  if (days==1) return " 1 day Ago"
  return `${days}days ago`
     
  }
const Jobcard = ({ job }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500 transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 bg-blue-900 rounded-lg flex items-center justify-center shrink-0">
          <span className="font-bold text-blue-400 text-sm">{job.company?.charAt(0)}</span>
        </div>
        <div>
          <h2 className="text-base font-semibold text-white">{job.title}</h2>
          <p className="text-gray-400 text-xs">{job.company}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-xs px-2 py-1 rounded-full bg-gray-700 text-gray-300">📍 {job.location}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-blue-900 text-blue-400 font-medium">{job.jobType}</span>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-500 text-xs">{timeAgo(job.createdAt)}</span>
        <Link
          className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 text-sm"
          to={`/jobs/${job._id}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Jobcard;
