import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allSkills, allLocations, allRoles, allEducation } from "./FilterArrays";

const Section = ({ title, children }) => (
  <div className="bg-white/70 backdrop-blur rounded-2xl p-4 shadow-sm border">
    <h3 className="font-semibold text-gray-800 mb-3">{title}</h3>
    {children}
  </div>
);

const FilterPanel = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false);
  const [width, setWidth] = useState(360);
  const resizing = useRef(false);

  if (!filters) return null;

  const safeFilters = {
    skills: filters.skills ?? [],
    locations: filters.locations ?? [],
    roles: filters.roles ?? [],
    minExperience: filters.minExperience ?? 0,
    maxSalary: filters.maxSalary ?? 1000000,
    education: filters.education ?? ""
  };

  const toggleSelection = (key, value) => {
    setFilters(prev => {
      const current = Array.isArray(prev[key]) ? prev[key] : [];
      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
      };
    });
  };

  const startResize = () => {
    resizing.current = true;
    document.body.style.cursor = "col-resize";
  };
  const stopResize = () => {
    resizing.current = false;
    document.body.style.cursor = "default";
  };
  const resize = e => {
    if (!resizing.current) return;
    setWidth(prev => Math.min(460, Math.max(300, prev + e.movementX)));
  };

  const pill = (active, gradient) =>
    `px-4 py-1.5 rounded-full text-sm font-medium transition-all
     ${active
      ? `bg-gradient-to-r ${gradient} text-white shadow-md scale-[1.03]`
      : "bg-white text-gray-700 border hover:shadow-sm"
    }`;

  const panelContent = (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Filters</h2>

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {allSkills.map(skill => (
            <motion.button
              key={skill}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSelection("skills", skill)}
              className={pill(safeFilters.skills.includes(skill), "from-blue-500 to-indigo-500")}
            >
              {skill}
            </motion.button>
          ))}
        </div>
      </Section>

      <Section title="Experience (Years)">
        <input
          type="number"
          value={safeFilters.minExperience}
          onChange={e =>
            setFilters(p => ({ ...p, minExperience: +e.target.value }))
          }
          className="w-full rounded-xl p-3 border focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </Section>

      <Section title="Locations">
        <div className="flex flex-wrap gap-2">
          {allLocations.map(loc => (
            <motion.button
              key={loc}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSelection("locations", loc)}
              className={pill(safeFilters.locations.includes(loc), "from-emerald-500 to-green-500")}
            >
              {loc}
            </motion.button>
          ))}
        </div>
      </Section>

      <Section title="Roles">
        <div className="flex flex-wrap gap-2">
          {allRoles.map(role => (
            <motion.button
              key={role}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleSelection("roles", role)}
              className={pill(safeFilters.roles.includes(role), "from-purple-500 to-pink-500")}
            >
              {role}
            </motion.button>
          ))}
        </div>
      </Section>

      <Section title="Max Salary (₹)">
        <input
          type="number"
          value={filters.maxSalary}
          onChange={e =>
            setFilters(p => ({ ...p, maxSalary: +e.target.value }))
          }
          className="w-full rounded-xl p-3 border focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </Section>

      <Section title="Education">
        <select
          value={filters.education}
          onChange={e =>
            setFilters(p => ({ ...p, education: e.target.value }))
          }
          className="w-full rounded-xl p-3 border bg-white"
        >
          {allEducation.map(e => (
            <option key={e}>{e}</option>
          ))}
        </select>
      </Section>
    </div>
  );

  return (
    <>
      {/* Mobile FAB */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-xl"
      >
        Filters
      </button>

      {/* Desktop Sidebar */}
      <motion.aside
        style={{ width }}
        onMouseMove={resize}
        onMouseUp={stopResize}
        className="hidden md:flex relative bg-gradient-to-b from-white to-gray-50 rounded-tr-3xl rounded-br-3xl shadow-2xl border-r sticky top-0 h-screen overflow-y-auto"
      >
        {panelContent}

        <div onMouseDown={startResize} className="absolute top-0 right-0 w-2 h-full cursor-col-resize group">
          <div className="w-[3px] h-full mx-auto bg-gray-300 group-hover:bg-blue-500 transition" />
        </div>
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.aside
              className="fixed left-0 top-0 h-full w-[88%] bg-white rounded-tr-3xl rounded-br-3xl z-50 shadow-2xl overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            >
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h2 className="text-lg font-bold">Filters</h2>
                <button onClick={() => setOpen(false)}>✕</button>
              </div>
              {panelContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterPanel;
