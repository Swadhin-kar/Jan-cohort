import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, CheckCircle, Briefcase,
  Code, Coffee, FileText, Sparkles, Target
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Drafts = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [generatedJD, setGeneratedJD] = useState("");
  const [error, setError] = useState("");
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

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : prev.skills.length < 10 ? [...prev.skills, skill] : prev.skills
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setGeneratedJD("");
    setError("");

    try {
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

  useEffect(() => {
    if (generatedJD) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [generatedJD]);

  const formatJD = (text) => {
    if (!text) return [];
    return text.split(/\n(?=[A-Z][A-Za-z\s]+:)/g).map(section => {
      const [title, ...content] = section.split(":");
      return { title: title.trim(), content: content.join(":").trim() };
    });
  };

  const containerVars = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { staggerChildren: 0.1 } },
    exit: { opacity: 0, x: -20 }
  };

  const itemVars = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden"
      >

        {/* HEADER */}
        <div className="bg-gradient-to-br from-blue-50 to-sky-100 p-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow">
              <Sparkles className="text-blue-500" size={20} />
            </div>
            <h1 className="text-2xl font-extrabold text-blue-900">
              AI Job <span className="text-blue-500">Architect</span>
            </h1>
          </div>
          <p className="text-blue-600 text-sm mt-1">Design perfect roles in minutes</p>
        </div>

        {/* PROGRESS */}
        <div className="px-8 pt-8">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600"
              animate={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* FORM */}
        <div className="p-8 min-h-[400px]">
          <AnimatePresence mode="wait">

            {step === 1 && (
              <motion.div variants={containerVars} initial="initial" animate="animate" exit="exit" className="space-y-6">
                <motion.input variants={itemVars}
                  placeholder="Job Title"
                  className="w-full p-3 border rounded-xl"
                  value={formData.jobTitle}
                  onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div variants={containerVars} initial="initial" animate="animate" exit="exit" className="flex flex-wrap gap-2">
                {skillOptions.map(skill => (
                  <motion.button
                    key={skill}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleSkill(skill)}
                    className={`px-4 py-2 rounded-full border text-sm ${
                      formData.skills.includes(skill)
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-600'
                    }`}
                  >
                    {skill}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {step === 3 && (
              <motion.textarea
                variants={itemVars}
                initial="initial"
                animate="animate"
                placeholder="Special requirements"
                className="w-full min-h-[120px] border rounded-xl p-3"
                value={formData.specialRequirements}
                onChange={e => setFormData({ ...formData, specialRequirements: e.target.value })}
              />
            )}

            {step === 4 && (
              <motion.div variants={containerVars} initial="initial" animate="animate" exit="exit">
                <p className="font-bold">Review & Generate</p>
              </motion.div>
            )}

          </AnimatePresence>

          {/* LOADING */}
          {loading && (
            <motion.div className="mt-10 flex flex-col items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full"
              />
              <p className="font-semibold text-blue-600">Crafting your JD…</p>
            </motion.div>
          )}

          {/* ERROR */}
          {error && <p className="text-red-600 mt-6">{error}</p>}

          {/* RESULT */}
          <AnimatePresence>
            {generatedJD && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                className="mt-10 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 blur-2xl rounded-3xl" />
                <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-3xl border shadow-2xl">
                  <div className="flex justify-between mb-4">
                    <h3 className="font-extrabold text-lg flex items-center gap-2">
                      <FileText size={18} /> Generated Job Description
                    </h3>
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedJD)}
                      className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg"
                    >
                      Copy
                    </button>
                  </div>

                  {formatJD(generatedJD).map((sec, i) => (
                    <div key={i} className="mb-4">
                      <h4 className="text-xs font-bold text-blue-600 uppercase">{sec.title}</h4>
                      <p className="text-sm text-slate-700 whitespace-pre-line">{sec.content}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* FOOTER */}
        <div className="px-8 py-6 bg-slate-50 border-t flex justify-between">
          <button onClick={handleBack} disabled={step === 1}>Back</button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={step === 4 ? handleSubmit : handleNext}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            {step === 4 ? "Generate" : "Continue"}
          </motion.button>
        </div>

      </motion.div>
    </div>
  );
};

export default Drafts;
