// src/pages/QuestionPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const skillOptions = ['Python', 'FastAPI', 'Docker', 'React', 'Node.js', 'Java'];
const cityOptions = ['Bangalore', 'Hyderabad', 'Pune', 'Delhi', 'Mumbai', 'Chennai'];
const degreeOptions = ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc', 'Other'];

const steps = [
  'skills',
  'experience_years',
  'preferred_locations',
  'preferred_roles',
  'expected_salary',
  'degree',
  'field',
  'cgpa',
];

const QuestionPage = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    skills: [],
    experience_years: '',
    preferred_locations: [],
    preferred_roles: '',
    expected_salary: '',
    education: { degree: '', field: '', cgpa: '' },
  });

  const [inputValue, setInputValue] = useState('');

  const currentStep = steps[stepIndex];

  const handleNext = () => {

    const updatedData = { ...formData };

    switch (currentStep) {
      case 'skills':
        if (formData.skills.length === 0) return; // validation
        break;
      case 'experience_years':
      case 'expected_salary':
      case 'cgpa':
        if (!inputValue) return;
        if (currentStep === 'cgpa') updatedData.education.cgpa = parseFloat(inputValue);
        else updatedData[currentStep] = Number(inputValue);
        setFormData(updatedData);
        setInputValue('');
        break;
      case 'preferred_roles':
        if (!inputValue) return;
        updatedData.preferred_roles = inputValue.split(',').map(s => s.trim());
        setFormData(updatedData);
        setInputValue('');
        break;
      case 'degree':
      case 'field':
        if (!inputValue && currentStep === 'field') return;
        if (currentStep === 'field') updatedData.education.field = inputValue;
        setFormData(updatedData);
        setInputValue('');
        break;
      default:
        break;
    }

    setStepIndex(prev => prev + 1);
  };

  const handleBack = () => setStepIndex(prev => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    // console.log('Candidate JSON:', formData);
    // alert('Form submitted! Check console for JSON.');
    

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <AnimatePresence mode="wait">
          {stepIndex < steps.length ? (
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-4 capitalize">
                {currentStep.replace('_', ' ')}
              </h2>

              {/* SKILLS */}
              {currentStep === 'skills' && (
                <div className="space-y-2">
                  {skillOptions.map(skill => (
                    <label key={skill} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.skills.includes(skill)}
                        onChange={(e) => {
                          const newSkills = e.target.checked
                            ? [...formData.skills, skill]
                            : formData.skills.filter(s => s !== skill);
                          setFormData(prev => ({ ...prev, skills: newSkills }));
                        }}
                      />
                      <span>{skill}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* EXPERIENCE, SALARY, CGPA */}
              {(currentStep === 'experience_years' ||
                currentStep === 'expected_salary' ||
                currentStep === 'cgpa') && (
                <input
                  type="number"
                  value={
                    currentStep === 'cgpa'
                      ? formData.education.cgpa || inputValue
                      : inputValue || formData[currentStep]
                  }
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Enter your ${currentStep.replace('_', ' ')}`}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}

              {/* LOCATIONS */}
              {currentStep === 'preferred_locations' && (
                <div className="flex flex-wrap gap-2">
                  {cityOptions.map(city => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        const newCities = formData.preferred_locations.includes(city)
                          ? formData.preferred_locations.filter(c => c !== city)
                          : [...formData.preferred_locations, city];
                        setFormData(prev => ({ ...prev, preferred_locations: newCities }));
                      }}
                      className={`px-4 py-2 rounded-full border ${
                        formData.preferred_locations.includes(city)
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-700'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}

              {/* PREFERRED ROLES */}
              {currentStep === 'preferred_roles' && (
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Backend Developer, Full Stack Developer"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}

              {/* DEGREE */}
              {currentStep === 'degree' && (
                <div className="space-y-2">
                  {degreeOptions.map(degree => (
                    <label key={degree} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="degree"
                        checked={formData.education.degree === degree}
                        onChange={() => setFormData(prev => ({
                          ...prev,
                          education: { ...prev.education, degree }
                        }))}
                      />
                      <span>{degree}</span>
                    </label>
                  ))}
                  {formData.education.degree === 'Other' && (
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Enter your degree"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  )}
                </div>
              )}

              {/* FIELD */}
              {currentStep === 'field' && (
                <input
                  type="text"
                  value={inputValue || formData.education.field}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Computer Science"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}

              <div className="flex justify-between mt-4">
                <button
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                  className={`px-4 py-2 rounded-md ${stepIndex === 0 ? 'bg-gray-300' : 'bg-gray-500 text-white hover:bg-gray-600'}`}
                >
                  Back
                </button>
                <button
                  onClick={currentStep === 'skills' && formData.skills.length === 0 ? null : handleNext}
                  className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                  {stepIndex === steps.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="submit"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-xl font-bold mb-4">Review & Submit</h2>
              <pre className="text-left bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto">
                {JSON.stringify(formData, null, 2)}
              </pre>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-md bg-green-500 text-white hover:bg-green-600"
              >
                Submit
              </button>
              <button
                onClick={() => setStepIndex(0)}
                className="px-6 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 ml-2"
              >
                Edit
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuestionPage;
