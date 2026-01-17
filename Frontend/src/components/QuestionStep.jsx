export default function QuestionStep({ question, value, onChange, onNext }) {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl mb-4">{question.label}</h2>

      {question.type === "text" && (
        <input
          className="input w-full mb-4"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        />
      )}

      {question.type === "number" && (
        <input
          type="number"
          className="input w-full mb-4"
          value={value || ""}
          onChange={e => onChange(Number(e.target.value))}
        />
      )}

      {question.type === "multi" && (
        <input
          className="input w-full mb-4"
          value={value ? value.join(", ") : ""}
          onChange={e => onChange(e.target.value.split(",").map(s => s.trim()))}
        />
      )}

      <button className="btn" onClick={onNext}>Next</button>
    </div>
  );
}
    