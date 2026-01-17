import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jobsData from "../data/jobs.json";
import JobCard from "./JobCard";

const candidateProfile = {
  skills: ["Python", "FastAPI", "Docker", "React"],
  experience_years: 1,
  preferred_locations: ["Bangalore", "Hyderabad"],
  preferred_roles: ["Backend Developer", "Full Stack Developer"],
  expected_salary: 800000,
  education: {
    degree: "B.Tech",
    field: "Computer Science",
    cgpa: 8.5
  }
};

const JobBoard = () => {
  const [filters, setFilters] = useState({
    locations: candidateProfile.preferred_locations,
    roles: candidateProfile.preferred_roles,
    minExperience: candidateProfile.experience_years,
    maxSalary: candidateProfile.expected_salary,
    skills: candidateProfile.skills
  });

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    let jobs = [...jobsData.jobs];

    // Location match
    jobs = jobs.filter(job =>
      filters.locations.includes(job.location)
    );

    // Role match
    jobs = jobs.filter(job =>
      filters.roles.includes(job.title)
    );

    // Experience match
    jobs = jobs.filter(job => {
      const minExp = parseInt(job.experience_required);
      return minExp <= filters.minExperience;
    });

    // Salary match
    jobs = jobs.filter(
      job => job.salary_range[0] <= filters.maxSalary
    );

    // Skills overlap
    jobs = jobs.filter(job =>
      filters.skills.some(skill =>
        job.required_skills.includes(skill)
      )
    );

    setFilteredJobs(jobs);
  }, [filters]);

  return (
    <motion.div
      className="flex h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* 🔹 FILTER PANEL */}
      <motion.aside
        className="w-[30%] min-w-[320px] p-6 bg-white border-r overflow-y-auto"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h2 className="text-xl font-semibold mb-6">
          Candidate Preferences
        </h2>

        {/* Skills */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {candidateProfile.skills.map(skill => (
              <span
                key={skill}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Salary */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">
            Expected Salary (₹)
          </h3>
          <input
            type="range"
            min="300000"
            max="2000000"
            step="50000"
            value={filters.maxSalary}
            onChange={e =>
              setFilters({
                ...filters,
                maxSalary: Number(e.target.value)
              })
            }
            className="w-full"
          />
          <p className="text-sm mt-1 text-gray-600">
            Up to ₹{filters.maxSalary.toLocaleString()}
          </p>
        </div>

        {/* Education */}
        <div className="mb-6">
          <h3 className="font-medium mb-1">Education</h3>
          <p className="text-sm text-gray-600">
            {candidateProfile.education.degree} in{" "}
            {candidateProfile.education.field}
          </p>
          <p className="text-sm text-gray-600">
            CGPA: {candidateProfile.education.cgpa}
          </p>
        </div>
      </motion.aside>

      {/* 🔹 MAIN PANEL */}
      <main className="w-[70%] p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">
            Recommended Jobs ({filteredJobs.length})
          </h2>

          <AnimatePresence>
            {filteredJobs.map(job => (
              <motion.div
                key={job.job_id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                layout
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </motion.div>
  );
};

export default JobBoard;
