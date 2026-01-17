import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jobsData from "../data/jobs.json";
import JobCard from "./JobCard";
import FilterPanel from "./FilterPanel";
import JobModal from "./JobResults";

// Candidate default profile
const candidateProfile = {
    skills: ["Python", "FastAPI", "Docker", "React"],
    experience_years: 1,
    preferred_locations: ["Bangalore", "Hyderabad"],
    preferred_roles: ["Backend Developer", "Full Stack Developer"],
    expected_salary: 800000,
    education: "B.Tech"
};

const JobBoard = () => {
    // Initialize filters state with default values from candidateProfile
    const [filters, setFilters] = useState({
        skills: candidateProfile.skills,
        minExperience: candidateProfile.experience_years,
        locations: candidateProfile.preferred_locations,
        roles: candidateProfile.preferred_roles,
        maxSalary: candidateProfile.expected_salary,
        education: candidateProfile.education
    });

    const [filteredJobs, setFilteredJobs] = useState([]);
    const [layout, setLayout] = useState("grid"); // "grid" or "list"
    const [selectedJob, setSelectedJob] = useState(null);


    // Filter jobs dynamically whenever filters change
    useEffect(() => {
        let jobs = [...jobsData.jobs];

        // Location match
        jobs = jobs.filter(job => filters.locations.includes(job.location));

        // Role match
        jobs = jobs.filter(job => filters.roles.includes(job.title));

        // Experience match
        jobs = jobs.filter(job => {
            const minExp = parseInt(job.experience_required.split("-")[0]);
            return minExp <= filters.minExperience;
        });

        // Salary match
        jobs = jobs.filter(job => job.salary_range[0] <= filters.maxSalary);

        // Skills overlap
        jobs = jobs.filter(job =>
            filters.skills.some(skill => job.required_skills.includes(skill))
        );

        // Education filter (optional)
        // If you want to filter based on degree field, you can implement here

        setFilteredJobs(jobs);
    }, [filters]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
    };


    return (
        <motion.div className="flex h-screen bg-gray-50">
            {/* Filter Panel */}
            <FilterPanel filters={filters} setFilters={setFilters} />

            {/* Main Panel */}
            {/* <main className="w-[70%] p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-5">
          <h2 className="text-2xl font-semibold mb-6">
            Recommended Jobs ({filteredJobs.length})
          </h2>

          <AnimatePresence>
            {filteredJobs.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-500 text-center mt-10"
              >
                No jobs match your criteria.
              </motion.div>
            )}

            {filteredJobs.map(job => (
              <motion.div
                key={job.job_id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <JobCard job={job} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main> */}

            <main className="w-[70%] p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto space-y-5">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">
                            Recommended Jobs ({filteredJobs.length})
                        </h2>

                        {/* Grid/List toggle */}
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setLayout("grid")}
                                className={`px-3 py-1 rounded ${layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setLayout("list")}
                                className={`px-3 py-1 rounded ${layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                List
                            </button>
                        </div>

                    </div>

                    <AnimatePresence>
                        {filteredJobs.length === 0 && (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-gray-500 text-center mt-10"
                            >
                                No jobs match your criteria.
                            </motion.div>
                        )}

                        <div
                            className={`grid gap-5 ${layout === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                                }`}
                        >
                            {filteredJobs.map((job) => (
                                <motion.div
                                    key={job.job_id}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    layout
                                >
                                    <JobCard
                                        job={job}
                                        layout={layout}
                                        onClick={() => setSelectedJob(job)}
                                    />

                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                </div>
                <JobModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />

            </main>

        </motion.div>
    );
};

export default JobBoard;
