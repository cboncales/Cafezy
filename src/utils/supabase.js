import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

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
    console.error('Error getting session:', error, message)
    return false
  }

  return !!data.session
}

// Retrieve user information
export const getUserInformation = async () => {
  try {
    // Check if the session exists
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession()

    if (sessionError || !sessionData.session) {
      console.warn(
        'No active session found:',
        sessionError?.message || 'Session is null',
      )
      return null // Return null if no session exists
    }

    // Get user information
    const { data, error } = await supabase.auth.getUser()

    if (error) {
      console.error('Error fetching user:', error.message)
      return null
    }

    return data.user?.user_metadata || {} // Return user metadata or an empty object
  } catch (err) {
    console.error('Unexpected error in getUserInformation:', err)
    return null
  }
}
