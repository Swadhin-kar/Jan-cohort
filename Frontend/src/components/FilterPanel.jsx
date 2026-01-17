import { motion } from "framer-motion";

// Options for the filter UI
const allSkills = ["Python", "FastAPI", "Docker", "React", "Node", "AWS"];
const allLocations = ["Bangalore", "Hyderabad", "Remote", "Chennai"];
const allRoles = ["Backend Developer", "Full Stack Developer", "Frontend Developer"];
const allEducation = ["B.Tech", "M.Tech", "B.Sc", "M.Sc", "BCA", "MCA"];

const FilterPanel = ({ filters, setFilters }) => {
  if (!filters) return null; // safeguard against undefined

  // Utility function to toggle multi-select values
  const toggleSelection = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  return (
    <motion.aside
      className="w-[30%] min-w-[320px] p-6 bg-white border-r overflow-y-auto h-full"
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-2xl font-semibold mb-6">Filters</h2>

      {/* Skills Multi-Select */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {allSkills.map(skill => {
            const active = filters.skills.includes(skill);
            return (
              <motion.button
                key={skill}
                onClick={() => toggleSelection("skills", skill)}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 rounded-full text-sm transition
                  ${active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {skill}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Experience Year */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Experience (Years)</h3>
        <input
          type="number"
          min={0}
          max={15}
          value={filters.minExperience}
          onChange={e =>
            setFilters(prev => ({ ...prev, minExperience: Number(e.target.value) }))
          }
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Preferred Locations Multi-Select */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Preferred Locations</h3>
        <div className="flex flex-wrap gap-2">
          {allLocations.map(loc => {
            const active = filters.locations.includes(loc);
            return (
              <motion.button
                key={loc}
                onClick={() => toggleSelection("locations", loc)}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 rounded-full text-sm transition
                  ${active
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {loc}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Preferred Roles Multi-Select */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Preferred Roles</h3>
        <div className="flex flex-wrap gap-2">
          {allRoles.map(role => {
            const active = filters.roles.includes(role);
            return (
              <motion.button
                key={role}
                onClick={() => toggleSelection("roles", role)}
                whileTap={{ scale: 0.95 }}
                className={`px-3 py-1 rounded-full text-sm transition
                  ${active
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {role}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Expected Salary */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Expected Salary (₹)</h3>
        <input
          type="number"
          min={200000}
          max={5000000}
          step={50000}
          value={filters.maxSalary}
          onChange={e =>
            setFilters(prev => ({ ...prev, maxSalary: Number(e.target.value) }))
          }
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Education Dropdown */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Education</h3>
        <select
          value={filters.education}
          onChange={e =>
            setFilters(prev => ({ ...prev, education: e.target.value }))
          }
          className="w-full p-2 border rounded"
        >
          {allEducation.map(edu => (
            <option key={edu} value={edu}>
              {edu}
            </option>
          ))}
        </select>
      </div>
    </motion.aside>
  );
};

export default FilterPanel;
