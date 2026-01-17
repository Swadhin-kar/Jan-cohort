import { useParams } from 'react-router-dom'
import { jobs } from '../data/jobs'
import FilterPanel from '../components/FilterPanel'
import JobList from '../components/JobList'
import { useState, useMemo } from 'react'
import { filterJobs } from '../utils/filterJobs'


export default function Search() {
const { search } = useParams()
const [filters, setFilters] = useState({})


const filteredJobs = useMemo(() => (
filterJobs(jobs, search, filters)
), [search, filters])


return (
<div className="flex">
<FilterPanel filters={filters} setFilters={setFilters} />
<JobList jobs={filteredJobs} />
</div>
)
}