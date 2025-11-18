import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchCompanies = async (params = {}) => {
  try {
    const response = await api.get('/companies', { params })
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 'Failed to fetch companies'
    )
  }
}

export const fetchCompany = async (id) => {
  try {
    const response = await api.get(`/companies/${id}`)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 'Failed to fetch company'
    )
  }
}

export const fetchFilterValues = async () => {
  try {
    const response = await api.get('/companies/filters/values')
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 'Failed to fetch filter values'
    )
  }
}

export const createCompany = async (companyData) => {
  try {
    const response = await api.post('/companies', companyData)
    return response.data
  } catch (error) {
    throw new Error(
      error.response?.data?.error || 'Failed to create company'
    )
  }
}

