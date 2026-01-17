import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import jobsData from "../data/jobs.json";
import JobCard from "./JobCard";
import FilterPanel from "./FilterPanel";
import JobModal from "./JobResults";

const candidateProfile = {
    skills: ["Python", "FastAPI", "Docker", "React"],
    experience_years: 1,
    preferred_locations: ["Bangalore", "Hyderabad"],
    preferred_roles: ["Backend Developer", "Full Stack Developer"],
    expected_salary: 800000,
    education: "B.Tech"
};

const JobBoard = () => {
    const [filters, setFilters] = useState({
        skills: candidateProfile.skills,
        minExperience: candidateProfile.experience_years,
        locations: candidateProfile.preferred_locations,
        roles: candidateProfile.preferred_roles,
        maxSalary: candidateProfile.expected_salary,
        education: candidateProfile.education
    });

    const [filteredJobs, setFilteredJobs] = useState([]);
    const [layout, setLayout] = useState("grid");
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        let jobs = [...jobsData.jobs];

        // Check if user has any active selections
        const hasActiveFilters =
            filters.locations.length > 0 ||
            filters.roles.length > 0 ||
            filters.skills.length > 0;

        if (!hasActiveFilters) {
            setFilteredJobs(jobs);
            return;
        }

        const filtered = jobs.filter(job => {
            // 1. --- SKILLS: "OR" Logic ---
            // Match if job has ANY of the selected skills
            const skillsMatch = filters.skills.length === 0 ||
                filters.skills.some(skill => job.required_skills.includes(skill));

            // 2. --- LOCATION: "OR" Logic ---
            const locationMatch = filters.locations.length === 0 ||
                filters.locations.includes(job.location);

            // 3. --- ROLES: "OR" Logic ---
            const roleMatch = filters.roles.length === 0 ||
                filters.roles.includes(job.title);

            // 4. --- SALARY: Constraint ---
            const jobMaxSalary = job.salary_range[1];
            const salaryMatch = jobMaxSalary >= filters.maxSalary;

            // 5. --- EXPERIENCE: Constraint ---
            const jobMinExp = parseInt(job.experience_required.split("-")[0]) || 0;
            const experienceMatch = jobMinExp <= filters.minExperience;

            // --- FINAL LOGIC ---
            // Must satisfy Salary & Experience requirements
            // Must match EITHER Skills OR Location OR Role
            const isFlexibleMatch = skillsMatch || locationMatch || roleMatch;

            return salaryMatch && experienceMatch && isFlexibleMatch;
        });

        // Optional: Sort by "Relevance" (How many OR conditions matched)
        const scoredJobs = filtered.map(job => {
            let score = 0;
            if (filters.skills.some(s => job.required_skills.includes(s))) score++;
            if (filters.locations.includes(job.location)) score++;
            if (filters.roles.includes(job.title)) score++;
            return { ...job, matchScore: score };
        }).sort((a, b) => b.matchScore - a.matchScore);

        setFilteredJobs(scoredJobs);
    }, [filters]);

    const itemVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <motion.div className="flex h-screen bg-gray-50 overflow-hidden">
            <FilterPanel filters={filters} setFilters={setFilters} />

            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Recommended Jobs</h2>
                            <p className="text-gray-500 mt-1">Found {filteredJobs.length} opportunities</p>
                        </div>

                        <div className="flex bg-white p-1 rounded-xl shadow-sm border">
                            <button
                                onClick={() => setLayout("grid")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    layout === "grid" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                Grid
                            </button>
                            <button
                                onClick={() => setLayout("list")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    layout === "list" ? "bg-blue-600 text-white shadow-md" : "text-gray-600 hover:bg-gray-50"
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
                                className="flex flex-col items-center justify-center py-20 text-gray-400"
                            >
                                <span className="text-5xl mb-4">🔍</span>
                                <p className="text-lg">No matches found. Try adjusting your filters.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                layout
                                className={`grid gap-6 ${
                                    layout === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
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