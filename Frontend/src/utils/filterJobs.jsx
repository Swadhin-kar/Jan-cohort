export const filterJobs = (jobs, search, filters) => {
    return jobs.filter(job => {
        const matchSearch = job.title.toLowerCase().includes(search.toLowerCase())
        const matchExp = filters.experience ? job.experience <= filters.experience : true
        const matchSalary = filters.salary ? job.salary >= filters.salary[0] && job.salary <= filters.salary[1] : true
        const matchLocation = filters.location ? filters.location.includes(job.location) : true


        return matchSearch && matchExp && matchSalary && matchLocation
    }).sort((a, b) => b.match - a.match)
}