import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, ChevronLeft, CheckCircle, Sparkles, 
  FileText, Cpu, Layers, Star, Zap, Copy, RefreshCw 
} from 'lucide-react';
import {BACKEND_URL} from '../utils/backend'

const Drafts = () => {
  const [loading, setLoading] = useState(false);
  const [generatedJD, setGeneratedJD] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobTitle: '',
    industry: 'Technology',
    experienceLevel: 'Mid-Level',
    skills: [],
    culture: 'Innovative/Startup',
    specialRequirements: ''
  });

  const industries = ["Technology", "Healthcare", "Finance", "Education", "Creative Arts", "Retail"];
  const skillOptions = ["React", "TypeScript", "Node.js", "Python", "Project Management", "UI/UX Design", "AWS", "Sales", "Strategy"];
  const expLevels = ["Junior", "Mid-Level", "Senior", "Lead/Director"];
  const cultures = ["Startup", "Corporate", "Remote-First", "Fast-Paced", "Academic"];

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : prev.skills.length < 8 ? [...prev.skills, skill] : prev.skills
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setGeneratedJD("");
    setError("");

    try {
      // const res = await fetch("https://jan-cohort-z3t4.onrender.com/ai/generate-jd", {
      const res = await fetch("http://localhost:7000/ai/generate-jd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `
            Job Title: ${formData.jobTitle}
            Industry: ${formData.industry}
            Experience Level: ${formData.experienceLevel}
            Skills: ${formData.skills.join(", ")}
            Culture: ${formData.culture}
            Special Requirements: ${formData.specialRequirements}
          `
        })
      });

      if (!res.ok) throw new Error("Failed to generate job description");
      const data = await res.json();
      setGeneratedJD(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatJD = (text) => {
    if (!text) return [];
    // Enhanced regex to split by common JD headers
    return text.split(/\n(?=[A-Z][A-Za-z\s]+:)/g).map(section => {
      const [title, ...content] = section.split(":");
      return { title: title.trim(), content: content.join(":").trim() };
    });
  };

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-[#f0f7ff] font-sans text-slate-900 p-6 flex items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-200/40 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          
          {/* LEFT PANEL: Sidebar Info */}
          <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-sky-500 p-10 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
                  <Cpu size={24} />
                </div>
                <h2 className="text-xl font-bold tracking-tight">Architect AI</h2>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`flex items-center gap-4 transition-all duration-500 ${step >= i ? 'opacity-100' : 'opacity-40'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${step >= i ? 'bg-white text-blue-600 border-white' : 'border-white/30 text-white'}`}>
                      {step > i ? <CheckCircle size={16} /> : i}
                    </div>
                    <span className="text-sm font-medium">
                      {i === 1 && "Core Identity"}
                      {i === 2 && "Skill Matrix"}
                      {i === 3 && "Company Vibe"}
                      {i === 4 && "Final Review"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 p-4 bg-white/10 rounded-2xl border border-white/10 text-xs leading-relaxed">
              <p className="opacity-80">Our neural engine analyzes thousands of high-performing job descriptions to craft the perfect copy for your team.</p>
            </div>
          </div>

          {/* RIGHT PANEL: Form Content */}
          <div className="md:w-2/3 p-10 md:p-14 relative">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: TITLE & INDUSTRY */}
              {step === 1 && (
                <motion.div key="step1" {...fadeUp} className="space-y-8">
                  <header>
                    <h3 className="text-3xl font-extrabold text-slate-800">The Basics</h3>
                    <p className="text-slate-500 mt-2">Let's start with the foundational role details.</p>
                  </header>

                  <div className="space-y-4">
                    <label className="block text-sm font-semibold text-slate-700 ml-1">Job Title</label>
                    <input 
                      type="text"
                      placeholder="e.g. Senior Frontend Engineer"
                      className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none transition-all text-lg shadow-inner"
                      value={formData.jobTitle}
                      onChange={e => setFormData({...formData, jobTitle: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Industry</label>
                      <select 
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none appearance-none"
                        value={formData.industry}
                        onChange={e => setFormData({...formData, industry: e.target.value})}
                      >
                        {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Experience</label>
                      <select 
                        className="w-full p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none appearance-none"
                        value={formData.experienceLevel}
                        onChange={e => setFormData({...formData, experienceLevel: e.target.value})}
                      >
                        {expLevels.map(exp => <option key={exp} value={exp}>{exp}</option>)}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: SKILLS */}
              {step === 2 && (
                <motion.div key="step2" {...fadeUp} className="space-y-8">
                  <header>
                    <h3 className="text-3xl font-extrabold text-slate-800">Skill Selection</h3>
                    <p className="text-slate-500 mt-2">Pick up to 8 core competencies for this role.</p>
                  </header>

                  <div className="flex flex-wrap gap-3">
                    {skillOptions.map(skill => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-6 py-3 rounded-2xl border-2 transition-all duration-300 font-medium ${
                          formData.skills.includes(skill)
                          ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                          : 'bg-white border-slate-100 text-slate-600 hover:border-blue-200'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: CULTURE & REQS */}
              {step === 3 && (
                <motion.div key="step3" {...fadeUp} className="space-y-8">
                  <header>
                    <h3 className="text-3xl font-extrabold text-slate-800">Culture & Tone</h3>
                    <p className="text-slate-500 mt-2">How should the description feel?</p>
                  </header>

                  <div className="grid grid-cols-2 gap-3">
                    {cultures.map(c => (
                      <button
                        key={c}
                        onClick={() => setFormData({...formData, culture: c})}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          formData.culture === c ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-100'
                        }`}
                      >
                        <span className="font-bold block">{c}</span>
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 ml-1">Special Requirements</label>
                    <textarea 
                      placeholder="Remote, relocation, visa support, specific travel..."
                      className="w-full min-h-[100px] p-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none"
                      value={formData.specialRequirements}
                      onChange={e => setFormData({...formData, specialRequirements: e.target.value})}
                    />
                  </div>
                </motion.div>
              )}

              {/* STEP 4: REVIEW */}
              {step === 4 && (
                <motion.div key="step4" {...fadeUp} className="space-y-6">
                  <header>
                    <h3 className="text-3xl font-extrabold text-slate-800">Ready to Build?</h3>
                    <p className="text-slate-500 mt-2">Review your selections before we generate.</p>
                  </header>

                  <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 space-y-4">
                    <div className="flex justify-between border-b border-blue-100 pb-3">
                      <span className="text-blue-600 font-bold uppercase text-[10px] tracking-widest">Job Role</span>
                      <span className="font-semibold text-slate-800">{formData.jobTitle || "Not set"}</span>
                    </div>
                    <div className="flex justify-between border-b border-blue-100 pb-3">
                      <span className="text-blue-600 font-bold uppercase text-[10px] tracking-widest">Industry</span>
                      <span className="font-semibold text-slate-800">{formData.industry}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.skills.map(s => (
                        <span key={s} className="px-3 py-1 bg-white border border-blue-200 text-blue-600 rounded-full text-xs font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ERROR & LOADING STATES */}
            <AnimatePresence>
              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="absolute inset-0 z-20 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-10 text-center"
                >
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 animate-pulse" />
                  </div>
                  <h4 className="text-xl font-bold mt-6 text-slate-800">Synthesizing Content...</h4>
                  <p className="text-slate-500 text-sm mt-2">We're applying deep learning to create your unique description.</p>
                </motion.div>
              )}

              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 border border-red-100">
                  <Zap size={18} /> <span className="text-sm font-medium">{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* NAVIGATION FOOTER */}
            <div className="mt-12 flex items-center justify-between border-t border-slate-100 pt-8">
              <button 
                onClick={handleBack} 
                disabled={step === 1}
                className={`flex items-center gap-2 font-bold px-4 py-2 rounded-xl transition-all ${step === 1 ? 'opacity-0' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}
              >
                <ChevronLeft size={20} /> Back
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={step === 4 ? handleSubmit : handleNext}
                className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-blue-200 transition-all"
              >
                {step === 4 ? (
                  <>Create JD <Sparkles size={18} /></>
                ) : (
                  <>Continue <ChevronRight size={18} /></>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* RESULTS SECTION */}
        <AnimatePresence>
          {generatedJD && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="border-t border-slate-100 bg-slate-50/50"
            >
              <div className="p-10 md:p-14">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                      <FileText className="text-blue-600" />
                      Draft Completed
                    </h3>
                    <p className="text-slate-500">Review, copy, or regenerate the description.</p>
                  </div>
                  <div className="flex gap-3">
                    <button 
                       onClick={() => handleSubmit()}
                       className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <RefreshCw size={20} className="text-slate-600" />
                    </button>
                    <button 
                      onClick={() => navigator.clipboard.writeText(generatedJD)}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                      <Copy size={18} /> Copy to Clipboard
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {formatJD(generatedJD).map((sec, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm group hover:shadow-md transition-shadow"
                    >
                      <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <Star size={12} fill="currentColor" /> {sec.title}
                      </h4>
                      <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line group-hover:text-slate-900 transition-colors">
                        {sec.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Drafts;