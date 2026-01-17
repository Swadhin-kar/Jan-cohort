const JobCard = ({ job }) => {
  return (
    <div className="border p-4 mb-3 rounded">
      <h3 className="font-semibold">{job.title}</h3>
      <p>{job.company}</p>
      <p>📍 {job.location}</p>
      <p>💼 {job.experience}+ years</p>
      <p>💰 ₹{job.salary}</p>
    </div>
  );
};

export default JobCard;
