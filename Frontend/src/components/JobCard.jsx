const JobCard = ({ job, layout, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white border border-gray-200 rounded-xl p-5 cursor-pointer
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1
        ${layout === "list" ? "flex gap-6 items-center" : ""}
      `}
    >
      <div className="flex-1 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {job.title}
        </h3>

        <p className="text-sm text-gray-600">
          {job.company} • <span className="text-gray-500">{job.location}</span>
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {job.required_skills.slice(0, 4).map((skill, index) => (
            <span
              key={index}
              className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div
        className={`flex flex-col ${
          layout === "list" ? "items-end text-right" : "mt-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-sm font-medium text-gray-700">
          ₹{(job.salary_range[0] / 100000).toFixed(1)}L –{" "}
          {(job.salary_range[1] / 100000).toFixed(1)}L
        </p>

        <p className="text-xs text-gray-500">{job.experience_required}</p>

        <div className="flex gap-3 mt-4">
          <button className="text-sm px-4 py-1.5 rounded-md border hover:bg-gray-100">
            Save
          </button>
          <button className="text-sm px-4 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
