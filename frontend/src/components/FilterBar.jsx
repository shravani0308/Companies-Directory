import { useState } from 'react'

function FilterBar({ filters, filterValues, onFilterChange, viewMode, onViewModeChange }) {
  const [localSearch, setLocalSearch] = useState(filters.search)

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    onFilterChange({ search: localSearch })
  }

  const handleFilterChange = (key, value) => {
    onFilterChange({ [key]: value })
  }

  const clearFilters = () => {
    setLocalSearch('')
    onFilterChange({
      search: '',
      name: '',
      location: '',
      industry: '',
      sortBy: 'name',
      sortOrder: 'asc',
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search companies by name, location, industry..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {/* Name Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name
          </label>
          <input
            type="text"
            value={filters.name}
            onChange={(e) => handleFilterChange('name', e.target.value)}
            placeholder="Filter by name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Locations</option>
            {filterValues.locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Industry Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            value={filters.industry}
            onChange={(e) => handleFilterChange('industry', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Industries</option>
            {filterValues.industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <div className="flex gap-2">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="location">Location</option>
              <option value="industry">Industry</option>
              <option value="employees">Employees</option>
              <option value="founded">Founded</option>
            </select>
            <button
              onClick={() =>
                handleFilterChange(
                  'sortOrder',
                  filters.sortOrder === 'asc' ? 'desc' : 'asc'
                )
              }
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title={filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
            >
              {filters.sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={clearFilters}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Clear Filters
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => onViewModeChange('table')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'table'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Table View
          </button>
          <button
            onClick={() => onViewModeChange('card')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'card'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Card View
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar

