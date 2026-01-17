export const matchJobs = (jobs, candidate) => {
  return jobs
    .map(job => {
      let score = 0;
      let total = 0;

      // Skills match
      total += job.skills.length;
      job.skills.forEach(skill => {
        if (candidate.skills.includes(skill)) score++;
      });

      // Location match
      total += 1;
      if (candidate.location === job.location) score++;

      // Experience match
      total += 1;
      if (candidate.experience >= job.experience) score++;

      const matchPercent = Math.round((score / total) * 100);

      return { ...job, matchPercent };
    })
    .sort((a, b) => b.matchPercent - a.matchPercent);
};
