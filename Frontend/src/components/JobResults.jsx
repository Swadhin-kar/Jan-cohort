import JobCard from "./JobCard";

export default function JobResults({ jobs }) {
  return (
    <div className="grid gap-4 p-6">
      {jobs.length > 0 ? jobs.map(job => (
        <JobCard key={job.id} job={job} />
      )) : (
        <p>No jobs found matching your profile.</p>
      )}
    </div>
  );
}
