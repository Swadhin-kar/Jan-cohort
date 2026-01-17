export default function JobModal({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg p-6 rounded-lg">
        <h2 className="text-xl font-bold">{job.title}</h2>
        <p className="text-gray-500">
          {job.company} • {job.location}
        </p>

        <p className="mt-4 text-sm">{job.description}</p>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Close
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
