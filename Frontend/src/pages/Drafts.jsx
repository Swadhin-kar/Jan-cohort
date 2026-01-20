import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, CheckCircle, Briefcase,
  Code, Coffee, FileText, Sparkles, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JobDescriptionGenerator = () => {

  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: '',
    industry: '',
    experienceLevel: 'Mid',
    skills: [],
    culture: 'Startup',
    specialRequirements: ''
  });

  const industries = ["Technology", "Healthcare", "Finance", "Education", "Manufacturing", "Marketing"];
  const skillOptions = ["React", "Project Management", "Python", "Data Analysis", "SQL", "Public Speaking", "UI/UX Design", "AWS", "Sales", "Content Writing"];

  const handleNext = () => setStep((prev) => {
    // console.log("Current form data: ", formData);
    return Math.min(prev + 1, 4)
  });
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = () => {
    console.log("form data si : ", formData)
    ///////////////////////////////////////////////////call the function to generate JD using  AAAAI 





  }

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : prev.skills.length < 10 ? [...prev.skills, skill] : prev.skills
    }));
  };

  // Animation Variants
  const containerVars = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  const itemVars = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden"
      >
        <div className="bg-gradient-to-br from-blue-50 to-sky-100 p-8 relative overflow-hidden border-b border-blue-100/50">
          {/* Decorative background elements for a creative touch */}
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl" />
          <div className="absolute left-1/4 -bottom-10 w-24 h-24 bg-sky-300/20 rounded-full blur-xl" />

          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-blue-100">
                <Sparkles className="text-blue-500" size={20} />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-blue-900">
                AI Job <span className="text-blue-500">Architect</span>
              </h1>
            </div>
            <p className="text-blue-600/70 text-sm font-medium ml-1">
              Design the perfect role in minutes.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-8 pt-8">
          <div className="relative h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-blue-600"
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.5, ease: "circOut" }}
            />
          </div>
          <div className="flex justify-between mt-3">
            {['Core', 'Skills', 'Culture', 'Review'].map((label, i) => (
              <span key={label} className={`text-[12px] uppercase tracking-widest font-bold ${step > i ? 'text-blue-600' : 'text-slate-400'}`}>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-8 min-h-[400px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={containerVars} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Briefcase size={20} /></div>
                  <h2 className="text-xl font-bold text-slate-800">Basic Information</h2>
                </div>

                <motion.div variants={itemVars}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Job Title*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
                    placeholder="e.g. Product Designer"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  />
                </motion.div>

                <motion.div variants={itemVars}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Industry</label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white outline-none focus:border-blue-500"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  >
                    <option value="">Select Domain</option>
                    {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </motion.div>

                <motion.div variants={itemVars}>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Experience Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Entry', 'Mid', 'Senior'].map(level => (
                      <button
                        key={level}
                        onClick={() => setFormData({ ...formData, experienceLevel: level })}
                        className={`py-3 rounded-xl text-sm font-medium border transition-all ${formData.experienceLevel === level
                            ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm'
                            : 'border-slate-200 text-slate-500 hover:border-slate-300'
                          }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={containerVars} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Code size={20} /></div>
                  <h2 className="text-xl font-bold text-slate-800">Stack & Expertise</h2>
                </div>
                <p className="text-sm text-slate-500">Select 3-10 core competencies for this role.</p>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((skill, idx) => (
                    <motion.button
                      key={skill}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${formData.skills.includes(skill)
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-200'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                        }`}
                    >
                      {skill}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={containerVars} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Coffee size={20} /></div>
                  <h2 className="text-xl font-bold text-slate-800">Environment</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {['Startup', 'Corporate', 'Remote-first'].map((type) => (
                    <div
                      key={type}
                      onClick={() => setFormData({ ...formData, culture: type })}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.culture === type ? 'border-orange-500 bg-orange-50/30' : 'border-slate-100'
                        }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">{type}</span>
                        {formData.culture === type && <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center"><CheckCircle size={14} className="text-white" /></div>}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.div variants={itemVars}>
                  <label className="block text-sm font-semibold text-slate-700 mb-2 text-orange-600">Special Perks or Requirements</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 min-h-[120px] outline-none focus:border-orange-500 transition-all"
                    placeholder="Describe the unique benefits or specific needs..."
                    value={formData.specialRequirements}
                    onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                  />
                </motion.div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={containerVars} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><Target size={20} /></div>
                  <h2 className="text-xl font-bold text-slate-800">Final Review</h2>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 space-y-4">
                  <div className="flex justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-500 text-sm">Role</span>
                    <span className="font-bold text-slate-800">{formData.jobTitle}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-3">
                    <span className="text-slate-500 text-sm">Experience</span>
                    <span className="font-bold text-slate-800">{formData.experienceLevel} Level</span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-sm block mb-2">Key Competencies</span>
                    <div className="flex flex-wrap gap-1">
                      {formData.skills.map(s => <span key={s} className="bg-white px-2 py-1 rounded border text-[12px] font-bold text-slate-600">{s}</span>)}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 text-sm font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:text-slate-800'}`}
          >
            <ChevronLeft size={18} /> Back
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={step === 4 ? handleSubmit : handleNext}
            disabled={step === 1 && !formData.jobTitle}
            className={`px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all ${step === 4
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-blue-600 text-white shadow-blue-200 disabled:opacity-50 disabled:shadow-none'
              }`}
          >
            {step === 4 ? 'Launch Generator' : 'Continue'}
            {step !== 4 && <ChevronRight size={18} />}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDescriptionGenerator;