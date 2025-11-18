import CompanyTable from './CompanyTable'
import CompanyCard from './CompanyCard'
import Pagination from './Pagination'

function CompanyList({ companies, pagination, viewMode, onPageChange }) {
  if (companies.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <p className="text-gray-500 text-lg">No companies found matching your filters.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        Showing {companies.length} of {pagination.total} companies
      </div>
      
      {viewMode === 'table' ? (
        <CompanyTable companies={companies} />
      ) : (
        <CompanyCard companies={companies} />
      )}

      <Pagination
        currentPage={pagination.page}
        totalPages={pagination.pages}
        onPageChange={onPageChange}
      />
    </div>
  )
}

export default CompanyList

