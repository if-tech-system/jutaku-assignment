import { supabase } from '~/lib/supabase/browser'

export const useSupabaseMethod = () => {
  return {
    changeEmail: async (email: string): Promise<{ error?: string }> => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      console.log({ user })

      if (!user) return { error: 'No user logged in' }
      const { error } = await supabase.auth.updateUser({ email })
      if (error) return { error: error.message }
      return {}
    },
    changePassword: async (password: string): Promise<{ error?: string }> => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      if (!user) return { error: 'No user logged in' }
      const { error } = await supabase.auth.updateUser({ password })
      if (error) return { error: error.message }
      return {}
    },
    resetPassword: async (email: string): Promise<{ error?: string }> => {
      const { error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) return { error: error.message }
      return {}
    }
  }
}
