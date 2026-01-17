const tags = [
  "Remote",
  "MNC",
  "Startup",
  "Fresher",
  "Internship",
  "High Salary",
  "WFH",
  "Tech",
  "Non-Tech",
];

export default function QuickTags() {
  return (
    <section className="px-6 mt-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-5 py-2 border border-blue-200 rounded-full 
                         text-sm text-blue-700 bg-[rgb(var(--primary-soft))] 
                         hover:bg-blue-600 hover:text-white 
                         transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
