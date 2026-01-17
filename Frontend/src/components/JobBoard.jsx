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

        // Check if any specific filters are actually active beyond defaults
        const hasActiveFilters =
            filters.locations.length > 0 ||
            filters.roles.length > 0 ||
            filters.skills.length > 0;

        // If no filters are selected at all, show everything
        if (!hasActiveFilters) {
            setFilteredJobs(jobs);
            return;
        }

        const filtered = jobs.filter(job => {
            // Must have ALL selected skills
            // OR Logic: Match if the job contains ANY of the selected skills
            const skillsMatch = filters.skills.length === 0 ||
                filters.skills.some(skill => job.required_skills.includes(skill));

            // 2. --- LOCATION: "OR" Logic ---
            const locationMatch = filters.locations.length === 0 ||
                filters.locations.includes(job.location);

            // 3. --- ROLES: "OR" Logic ---
            const roleMatch = filters.roles.length === 0 ||
                filters.roles.includes(job.title);

            // 4. --- SALARY: Filter Logic ---
            // Show jobs where the top of the range is >= user's expectation
            const jobMaxSalary = job.salary_range[1];
            const salaryMatch = jobMaxSalary >= filters.maxSalary;

            // 5. --- EXPERIENCE: Constraint ---
            const jobMinExp = parseInt(job.experience_required.split("-")[0]) || 0;
            const experienceMatch = jobMinExp <= filters.minExperience;

            // --- COMBINED LOGIC ---
            // Skills, Salary, and Experience are mandatory (AND)
            // Either Location OR Role must match (OR)
            const isFlexibleMatch = locationMatch || roleMatch;

            return skillsMatch && salaryMatch && experienceMatch && isFlexibleMatch;
        });

        setFilteredJobs(filtered);
    }, [filters]);

    // Animation variants
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
                                className={`px-3 py-1 rounded transition-colors ${layout === "grid" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setLayout("list")}
                                className={`px-3 py-1 rounded transition-colors ${layout === "list" ? "bg-blue-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                List
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="popLayout">
                        {filteredJobs.length === 0 ? (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-gray-500 text-center mt-10"
                            >
                                No jobs match your criteria.
                            </motion.div>
                        ) : (
                            <motion.div
                                layout
                                className={`grid gap-5 ${layout === "grid"
                                        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                        : "grid-cols-1"
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
                            </motion.div>
                        )}
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