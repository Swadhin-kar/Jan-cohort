export default function MatchRing({ score }) {
  return (
    <div className="relative w-12 h-12">
      <svg className="rotate-[-90deg]">
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#e5e7eb"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          stroke="#3b82f6"
          strokeWidth="4"
          fill="none"
          strokeDasharray={`${score * 1.25} 125`}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
        {score}%
      </span>
    </div>
  );
}
