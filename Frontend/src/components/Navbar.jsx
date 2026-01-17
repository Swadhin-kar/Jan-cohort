import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import jobsData from "../data/jobs.json";
import { matchJobs } from "../utils/matchJobs";
import QuestionPage from "../components/QuestionPage";
import JobResults from "../components/JobResults";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [sticky, setSticky] = useState(false);
    useEffect(() => {
        const onScroll = () => setSticky(window.scrollY > 20);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const [showQuestions, setShowQuestions] = useState(false);
    const [results, setResults] = useState(null);

    const handleFindJob = () => setShowQuestions(true);

    const handleCompleteQuestions = (candidateJSON) => {
        const matchedJobs = matchJobs(jobsData, candidateJSON);
        setResults(matchedJobs);
    };

    return (
        <motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 w-full z-50 shadow-md ${sticky
                ? "backdrop-blur-xl bg-white/80 shadow-lg"
                : "bg-white"
                }`}
        >
            <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-extrabold tracking-tight text-blue-700"
                >
                    Wevolve
                </Link>

                {/* Primary CTA */}
                <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 260 }}
                    onClick={() => navigate("/job-board")}
                    className="hidden md:flex items-center justify-center
                     px-10 py-4 rounded-2xl
                     bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white text-lg font-semibold
                     shadow-xl shadow-blue-500/30"
                >
                    Find Your Dream Job
                </motion.button>

                {showQuestions && !results && (
                    <QuestionPage onComplete={handleCompleteQuestions} />
                )}

                {results && (
                    <JobResults jobs={results} />
                )}

                <div className="flex flex-row space-x-4">
                    {/* Right Controls */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/user/login")}
                            className="px-5 py-2.5 rounded-xl
                       border border-blue-600
                       text-blue-600 font-medium
                       hover:bg-blue-50"
                        >
                            Login
                        </motion.button>
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/user/signup")}
                            className="px-5 py-2.5 rounded-xl
                       border border-blue-600
                       text-blue-600 font-medium
                       hover:bg-blue-50"
                        >
                            Sign Up
                        </motion.button>
                    </div>
                </div>

            </nav>
        </motion.header>
    );
};

export default Navbar;
