import { motion, AnimatePresence } from "framer-motion";

const JobModal = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">
                {job.company} • {job.location}
              </p>
            </div>

            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <span>
              💰 ₹{(job.salary_range[0] / 100000).toFixed(1)}L –{" "}
              {(job.salary_range[1] / 100000).toFixed(1)}L
            </span>
            <span>🧑‍💻 {job.experience_required}</span>
            <span>🎓 {job.education || "Any degree"}</span>
          </div>

          {/* Skills */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.required_skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Job Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {job.description ||
                "You will work with a talented team to build scalable and high-performance applications. Responsibilities include backend development, API design, and collaboration with frontend teams."}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 rounded-md border hover:bg-gray-100">
              Save Job
            </button>
            <button className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700">
              Apply Now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default JobModal;
