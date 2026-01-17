export default function FilterPanel({ filters, setFilters }) {
  return (
    <div className="space-y-6">
      
      {/* Location */}
      <MultiSelect
        label="Location"
        options={["Bangalore", "Hyderabad", "Remote"]}
        value={filters.locations}
        onChange={v => setFilters({ ...filters, locations: v })}
      />

      {/* Experience */}
      <RangeSlider
        label="Experience (Years)"
        min={0}
        max={10}
        value={filters.experience}
        onChange={v => setFilters({ ...filters, experience: v })}
      />

      {/* Salary */}
      <RangeSlider
        label="Salary (LPA)"
        min={3}
        max={50}
        value={filters.salary}
        onChange={v => setFilters({ ...filters, salary: v })}
      />

      {/* Skills */}
      <SkillTagInput
        value={filters.skills}
        onChange={v => setFilters({ ...filters, skills: v })}
      />

      {/* Job Type */}
      <CheckboxGroup
        options={["Full-time", "Remote", "Hybrid", "Part-time"]}
        value={filters.jobType}
        onChange={v => setFilters({ ...filters, jobType: v })}
      />
    </div>
  );
}
