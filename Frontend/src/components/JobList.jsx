import { useState } from "react";
import JobCard from "./JobCard";

export default function JobList({ jobs }) {
  const [view, setView] = useState("grid");

  return (
    <section className="flex-1 p-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600">
          {jobs.length} jobs found
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 border rounded ${
              view === "grid" ? "bg-blue-600 text-white" : ""
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 border rounded ${
              view === "list" ? "bg-blue-600 text-white" : ""
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Jobs */}
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}
