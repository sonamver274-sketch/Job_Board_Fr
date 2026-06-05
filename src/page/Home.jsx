import React, { useState, useEffect } from "react";
import Jobcard from "../components/Jobcard";
import api from "../api/axios";

const salaryRanges = [
  { label: "0 - 3 LPA", min: 0, max: 300000 },
  { label: "3 - 6 LPA", min: 300000, max: 600000 },
  { label: "6 - 10 LPA", min: 600000, max: 1000000 },
  { label: "10+ LPA", min: 1000000, max: Infinity },
];

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  useEffect(() => {
    api.get("/jobs").then((res) => setJobs(res.data.data));
  }, []);

  const uniqueLocations = [...new Set(jobs.map((j) => j.location).filter(Boolean))];
  const uniqueCompanies = [...new Set(jobs.map((j) => j.company).filter(Boolean))];

  const toggle = (list, setList, val) =>
    setList((prev) => prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]);

  const clearAll = () => {
    setSelectedTypes([]);
    setSelectedLocations([]);
    setSelectedCompanies([]);
    setSelectedSalary(null);
  };

  const filtered = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase());
    const matchType = selectedTypes.length > 0 ? selectedTypes.includes(job.jobType) : true;
    const matchLocation = selectedLocations.length > 0 ? selectedLocations.includes(job.location) : true;
    const matchCompany = selectedCompanies.length > 0 ? selectedCompanies.includes(job.company) : true;
    const matchSalary = selectedSalary
      ? job.salery >= selectedSalary.min && job.salery <= selectedSalary.max
      : true;
    return matchSearch && matchType && matchLocation && matchCompany && matchSalary;
  });

  const typeCount = (type) => jobs.filter((j) => j.jobType === type).length;
  const locCount = (loc) => jobs.filter((j) => j.location === loc).length;
  const compCount = (comp) => jobs.filter((j) => j.company === comp).length;

  const hasFilters = selectedTypes.length > 0 || selectedLocations.length > 0 || selectedCompanies.length > 0 || selectedSalary;

  return (
    <div className="min-h-screen bg-gray-950 px-4 md:px-10 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-3">
            Find Your <span className="text-blue-400">Dream Job </span> Today
          </h1>
          <p className="text-lg text-gray-400">
            Connect with top employer and discover opportunity that match your skills and ambitions
          </p>
          <p className="text-sm text-gray-500 mt-2">Start your carrer journey with jobflow</p>

          <div className="flex gap-2 mt-6 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search job title, company or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium">
              Search
            </button>
          </div>
        </div>

        <div className="md:hidden mb-3">
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="flex items-center gap-2 bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm"
          >
            ⚙ Filters {hasFilters && <span className="bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">{selectedTypes.length + selectedLocations.length + selectedCompanies.length + (selectedSalary ? 1 : 0)}</span>}
          </button>

          {showMobileFilter && (
            <div className="mt-3 bg-gray-800 rounded-xl border border-gray-700 p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-white font-semibold text-sm">Filters</h3>
                {hasFilters && <button onClick={clearAll} className="text-blue-400 text-xs">Clear All</button>}
              </div>
              <p className="text-gray-400 text-xs uppercase mb-2">Job Type</p>
              {["full-time", "part-time", "remote", "internship"].map((type) => (
                <label key={type} className="flex items-center justify-between mb-2 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={selectedTypes.includes(type)} onChange={() => toggle(selectedTypes, setSelectedTypes, type)} className="accent-blue-500 w-4 h-4" />
                    <span className="text-gray-300 text-sm capitalize">{type}</span>
                  </div>
                  <span className="text-gray-500 text-xs">({typeCount(type)})</span>
                </label>
              ))}
              <p className="text-gray-400 text-xs uppercase mt-3 mb-2">Location</p>
              {uniqueLocations.slice(0, 5).map((loc) => (
                <label key={loc} className="flex items-center justify-between mb-2 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={selectedLocations.includes(loc)} onChange={() => toggle(selectedLocations, setSelectedLocations, loc)} className="accent-blue-500 w-4 h-4" />
                    <span className="text-gray-300 text-sm">{loc}</span>
                  </div>
                  <span className="text-gray-500 text-xs">({locCount(loc)})</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4 items-start bg-gray-900 rounded-2xl p-4 border border-gray-800">

          <div className="hidden md:block w-56 shrink-0 sticky top-6 self-start">
            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">

              <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700">
                <h3 className="text-white font-semibold text-sm">All Filters</h3>
                {hasFilters && (
                  <button onClick={clearAll} className="text-blue-400 text-xs hover:underline">Clear All</button>
                )}
              </div>

              <div className="px-4 py-4 border-b border-gray-700">
                <h4 className="text-white font-semibold text-sm mb-3">Job Type</h4>
                {["full-time", "part-time", "remote", "internship"].map((type) => (
                  <label key={type} className="flex items-center justify-between mb-2.5 cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={selectedTypes.includes(type)}
                        onChange={() => toggle(selectedTypes, setSelectedTypes, type)}
                        className="accent-blue-500 w-4 h-4" />
                      <span className="text-gray-300 text-sm capitalize group-hover:text-white">{type}</span>
                    </div>
                    <span className="text-gray-500 text-xs">({typeCount(type)})</span>
                  </label>
                ))}
              </div>

              <div className="px-4 py-4 border-b border-gray-700">
                <h4 className="text-white font-semibold text-sm mb-3">Location</h4>
                {uniqueLocations.slice(0, 6).map((loc) => (
                  <label key={loc} className="flex items-center justify-between mb-2.5 cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={selectedLocations.includes(loc)}
                        onChange={() => toggle(selectedLocations, setSelectedLocations, loc)}
                        className="accent-blue-500 w-4 h-4" />
                      <span className="text-gray-300 text-sm group-hover:text-white">{loc}</span>
                    </div>
                    <span className="text-gray-500 text-xs">({locCount(loc)})</span>
                  </label>
                ))}
              </div>

              <div className="px-4 py-4 border-b border-gray-700">
                <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
                {uniqueCompanies.slice(0, 6).map((comp) => (
                  <label key={comp} className="flex items-center justify-between mb-2.5 cursor-pointer group">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={selectedCompanies.includes(comp)}
                        onChange={() => toggle(selectedCompanies, setSelectedCompanies, comp)}
                        className="accent-blue-500 w-4 h-4" />
                      <span className="text-gray-300 text-sm group-hover:text-white truncate max-w-[100px]">{comp}</span>
                    </div>
                    <span className="text-gray-500 text-xs">({compCount(comp)})</span>
                  </label>
                ))}
              </div>

              <div className="px-4 py-4">
                <h4 className="text-white font-semibold text-sm mb-3">Salary Range</h4>
                {salaryRanges.map((range) => (
                  <label key={range.label} className="flex items-center gap-2 mb-2.5 cursor-pointer group">
                    <input
                      type="radio"
                      name="salary"
                      checked={selectedSalary?.label === range.label}
                      onChange={() => setSelectedSalary(range)}
                      className="accent-blue-500 w-4 h-4"
                    />
                    <span className="text-gray-300 text-sm group-hover:text-white">{range.label}</span>
                  </label>
                ))}
                {selectedSalary && (
                  <button onClick={() => setSelectedSalary(null)} className="text-blue-400 text-xs mt-1 hover:underline">
                    Clear
                  </button>
                )}
              </div>

            </div>
          </div>

          <div className="flex-1 min-w-0 max-w-2xl">
            <p className="text-gray-500 text-sm mb-4">{filtered.length} jobs found</p>
            {filtered.length === 0 ? (
              <p className="text-gray-500 text-center mt-20">No jobs found.</p>
            ) : (
              <div className="flex flex-col gap-3">
                {filtered.map((job) => (
                  <Jobcard key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>

          <div className="w-52 shrink-0 sticky top-6 self-start">
            <div className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <p className="text-blue-400 font-bold text-base leading-tight">Job<span className="text-white">Flow</span></p>
              <p className="text-xs text-blue-300 mb-3">Your Career Starts Here</p>
              <p className="text-white font-semibold text-sm mb-1">Get hired faster</p>
              <p className="text-gray-400 text-xs mb-3">
                Create your profile and let top employers find you directly.
              </p>
              <div className="border-t border-gray-700 pt-3 mt-1">
                <p className="text-white font-semibold text-sm mb-1">For Employers</p>
                <p className="text-gray-400 text-xs">
                  Post jobs and connect with the right candidates in minutes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
