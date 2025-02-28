'use server'

import {
  AFTER_SIGNIN_PATH,
  AFTER_SIGNOUT_PATH,
  AFTER_SIGNUP_FOR_DB_REGISTER_PATH
} from '@/const/config'
import { redirect } from 'next/navigation'
import { createClient } from '~/lib/supabase/server'
import { serverApi } from '~/lib/trpc/server-api'

type EmailAndPassword = {
  email: string
  password: string
}

export const signup = async ({
  email,
  password
}: EmailAndPassword): Promise<{
  error?: string
}> => {
  try {
    console.log('signup:', { email, password })

    const authResponse = await createClient().auth.signUp({
      email,
      password
      // options: {
      //   emailRedirectTo: `${location.origin}/api/auth/callback`
      // }
    })
    console.log('authResponse', authResponse)
    const user = authResponse.data.user
    await serverApi().user.create({
      email: user?.email ?? '',
      name: user?.email ?? ''
    })

    const userId = user?.id
    if (!userId) return { error: 'userId is undefined' }
    console.log('signup:', userId)
  } catch (error) {
    console.log('error', error)
    return { error: JSON.stringify(error) }
  }
  redirect(AFTER_SIGNUP_FOR_DB_REGISTER_PATH)
}
export const signin = async ({
  email,
  password
}: EmailAndPassword): Promise<{
  error?: string
}> => {
  try {
    console.log('signin:', { email, password })

    const { data, error } = await createClient().auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      console.log('error', error)
      return { error: JSON.stringify(error) }
    }
    if (!data) return { error: 'data is undefined' }
    console.log('signin成功', { data })
  } catch (error) {
    return { error: JSON.stringify(error) }
  }
  redirect(AFTER_SIGNIN_PATH)
}

export const signOut = async (): Promise<{
  error?: string
}> => {
  try {
    await createClient().auth.signOut()
    console.log('signOut成功')
  } catch (error) {
    console.error('signOut error', error)
    return { error: JSON.stringify(error) }
  }
  redirect(AFTER_SIGNOUT_PATH)
}

export const changeEmail = async (
  email: string
): Promise<{
  error?: string
}> => {
  try {
    console.log({ email })

    const { error } = await createClient().auth.updateUser({
      email
    })
    if (error) {
      console.log('changeEmail error', error)
      return { error: JSON.stringify(error) }
    }
    console.log('changeEmail成功', { email })
  } catch (error) {
    console.error('changeEmail error', error)
    return { error: JSON.stringify(error) }
  }
  return {}
}

type ChangePasswordParams = {
  userId: string
}

export const changePassword = async (
  password: string
): Promise<{
  error?: string
}> => {
  try {
    const { error } = await createClient().auth.updateUser({
      password
    })
    if (error) {
      console.log('changePassword error', error)
      return { error: JSON.stringify(error) }
    }
    console.log('changePassword成功')
  } catch (error) {
    console.error('changePassword error', error)
    return { error: JSON.stringify(error) }
  }
  return {}
}

type ResetPasswordParams = {
  email: string
}

export const resetPassword = async (
  email: string
): Promise<{
  error?: string
}> => {
  try {
    const { error } = await createClient().auth.resetPasswordForEmail(email)
    if (error) {
      console.log('resetPassword error', error)
      return { error: JSON.stringify(error) }
    }
    console.log('resetPassword成功', { email })
  } catch (error) {
    console.error('resetPassword error', error)
    return { error: JSON.stringify(error) }
  }
  return {}
}
