import { useState, useEffect } from 'react'
import CompanyList from './components/CompanyList'
import FilterBar from './components/FilterBar'
import LoadingSpinner from './components/LoadingSpinner'
import ErrorMessage from './components/ErrorMessage'
import CompanyForm from './components/CompanyForm'
import SuccessMessage from './components/SuccessMessage'
import { fetchCompanies, fetchFilterValues, createCompany } from './services/api'

function App() {
  const [companies, setCompanies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })
  const [filters, setFilters] = useState({
    search: '',
    name: '',
    location: '',
    industry: '',
    sortBy: 'name',
    sortOrder: 'asc',
  })
  const [filterValues, setFilterValues] = useState({
    locations: [],
    industries: [],
  })
  const [viewMode, setViewMode] = useState('table') // 'table' or 'card'
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    loadFilterValues()
  }, [])

  useEffect(() => {
    loadCompanies()
  }, [filters, pagination.page])

  const loadFilterValues = async () => {
    try {
      const data = await fetchFilterValues()
      setFilterValues(data)
    } catch (err) {
      console.error('Error loading filter values:', err)
    }
  }

  const loadCompanies = async () => {
    setLoading(true)
    setError(null)
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        ...(filters.search && { search: filters.search }),
        ...(filters.name && { name: filters.name }),
        ...(filters.location && { location: filters.location }),
        ...(filters.industry && { industry: filters.industry }),
      }
      const data = await fetchCompanies(params)
      setCompanies(data.companies)
      setPagination(data.pagination)
    } catch (err) {
      setError(err.message || 'Failed to load companies')
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCreateCompany = async (companyData) => {
    try {
      await createCompany(companyData)
      setSuccessMessage('Company created successfully!')
      // Refresh the company list
      await loadCompanies()
      // Refresh filter values to include new location/industry
      await loadFilterValues()
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error) {
      setError(error.message || 'Failed to create company')
      throw error
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Companies Directory
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Browse and filter through our directory of companies
              </p>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Company
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FilterBar
          filters={filters}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={loadCompanies} />
        ) : (
          <CompanyList
            companies={companies}
            pagination={pagination}
            viewMode={viewMode}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      {/* Company Form Modal */}
      <CompanyForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateCompany}
        filterValues={filterValues}
      />

      {/* Success Message */}
      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}
    </div>
  )
}

export default App

