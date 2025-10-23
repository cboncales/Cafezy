import { createClient } from '@supabase/supabase-js'

// Get environment variables with fallback for Vercel builds
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://eghdgxrbxarxwkbxxrte.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnaGRneHJieGFyeHdrYnh4cnRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNzI4MjYsImV4cCI6MjA3Mzc0ODgyNn0.LOURvDC3YbBtG5RlpgN_Z0M41vC0ubf5hk_3spBZpp8'

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

//Form Actions utils
export const formActionDefault = {
  formProcess: false,
  formStatus: 200,
  formErrorMessage: '',
  formSuccessMessage: '',
}

//check if the session exists and is valid; Return false if there's and error
export const isAuthenticated = async () => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Error getting session:', error.message)
    return false
  }

  return !!data.session
}

// 👉 Table Pagination
export const tablePagination = (
  { page, itemsPerPage, sortBy },
  defaultColumn = 'id',
  isAscending = true,
) => {
  const [column, order] = sortBy[0]
    ? [sortBy[0].key, sortBy[0].order === 'asc']
    : [defaultColumn, isAscending]

  if (itemsPerPage === -1) {
    const rangeStart = 0
    const rangeEnd = 999999999999999

    return { rangeStart, rangeEnd, column, order }
  }

  const rangeStart = (page - 1) * itemsPerPage
  const rangeEnd = rangeStart + itemsPerPage - 1

  return { rangeStart, rangeEnd, column, order }
}

// 👉 Handle Search if null turn to empty string
// prettier-ignore
export const tableSearch = (search) => {
  return (search ||= '')
}
