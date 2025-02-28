import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL
} from '~/util/env'
import { cookies } from 'next/headers'
import { CookieOptionsBase } from './cookie'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

type SetCookieArgs = {
  name: string
  value: string
  options: CookieOptions
}

export function createClient() {
  const cookiesStore = cookies()

  return createServerClient(
    NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        async getAll() {
          return (await cookiesStore).getAll()
        },
        async setAll(cookiesToSet: SetCookieArgs[]) {
          const resolvedCookiesStore = await cookiesStore

          for (const cookie of cookiesToSet) {
            resolvedCookiesStore.set(cookie.name, cookie.value, cookie.options)
          }
        }
      },
      cookieOptions: CookieOptionsBase
    }
  )
}
