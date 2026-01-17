import { useState } from "react";

const steps = ["skills", "location", "experience"];

export default function QuestionFlow({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    skills: [],
    location: "",
    experience: 0
  });

  const next = () => setStep(step + 1);

  return (
    <div className="p-6 max-w-md mx-auto">
      {steps[step] === "skills" && (
        <>
          <h2>Your Skills (comma separated)</h2>
          <input
            className="input"
            onChange={e =>
              setForm({
                ...form,
                skills: e.target.value.split(",").map(s => s.trim())
              })
            }
          />
          <button onClick={next}>Next</button>
        </>
      )}

      {steps[step] === "location" && (
        <>
          <h2>Preferred Location</h2>
          <input
            className="input"
            onChange={e => setForm({ ...form, location: e.target.value })}
          />
          <button onClick={next}>Next</button>
        </>
      )}

      {steps[step] === "experience" && (
        <>
          <h2>Experience (years)</h2>
          <input
            type="number"
            className="input"
            onChange={e =>
              setForm({ ...form, experience: Number(e.target.value) })
            }
          />
          <button onClick={() => onComplete(form)}>Find Jobs</button>
        </>
      )}
    </div>
  );
}
