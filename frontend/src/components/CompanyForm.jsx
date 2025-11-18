import { useState } from 'react'

function CompanyForm({ isOpen, onClose, onSubmit, filterValues }) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    industry: '',
    description: '',
    website: '',
    employees: '',
    founded: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Company name is required'
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }
    if (!formData.industry.trim()) {
      newErrors.industry = 'Industry is required'
    }
    if (formData.website && !isValidUrl(formData.website)) {
      newErrors.website = 'Please enter a valid URL'
    }
    if (formData.employees && (isNaN(formData.employees) || formData.employees < 0)) {
      newErrors.employees = 'Please enter a valid number'
    }
    if (formData.founded && (isNaN(formData.founded) || formData.founded < 1800 || formData.founded > new Date().getFullYear())) {
      newErrors.founded = 'Please enter a valid year'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const companyData = {
        ...formData,
        employees: formData.employees ? parseInt(formData.employees) : undefined,
        founded: formData.founded ? parseInt(formData.founded) : undefined,
        website: formData.website || undefined,
        description: formData.description || undefined,
      }
      await onSubmit(companyData)
      // Reset form
      setFormData({
        name: '',
        location: '',
        industry: '',
        description: '',
        website: '',
        employees: '',
        founded: '',
      })
      setErrors({})
      onClose()
    } catch (error) {
      console.error('Error creating company:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      name: '',
      location: '',
      industry: '',
      description: '',
      website: '',
      employees: '',
      founded: '',
    })
    setErrors({})
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={handleClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">
                Add New Company
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter company name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Location and Industry Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., San Francisco, CA"
                    list="locations"
                  />
                  <datalist id="locations">
                    {filterValues.locations.map((location) => (
                      <option key={location} value={location} />
                    ))}
                  </datalist>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.industry ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Technology"
                    list="industries"
                  />
                  <datalist id="industries">
                    {filterValues.industries.map((industry) => (
                      <option key={industry} value={industry} />
                    ))}
                  </datalist>
                  {errors.industry && (
                    <p className="mt-1 text-sm text-red-600">{errors.industry}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter company description"
                />
              </div>

              {/* Website, Employees, Founded Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.website ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="https://example.com"
                  />
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-600">{errors.website}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employees
                  </label>
                  <input
                    type="number"
                    name="employees"
                    value={formData.employees}
                    onChange={handleChange}
                    min="0"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.employees ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Number of employees"
                  />
                  {errors.employees && (
                    <p className="mt-1 text-sm text-red-600">{errors.employees}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Founded Year
                  </label>
                  <input
                    type="number"
                    name="founded"
                    value={formData.founded}
                    onChange={handleChange}
                    min="1800"
                    max={new Date().getFullYear()}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.founded ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Year"
                  />
                  {errors.founded && (
                    <p className="mt-1 text-sm text-red-600">{errors.founded}</p>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Creating...' : 'Create Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyForm

