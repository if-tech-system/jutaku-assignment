import type { CookieOptionsWithName } from '@supabase/ssr'
import { isLocal } from '~/util/env'

export const CookieOptionsBase: CookieOptionsWithName = {
  path: '/',
  secure: !isLocal, // HTTPSでのみ送信
  httpOnly: true, // JavaScriptでアクセス不可.trueにするとクライアントsupabaseが使えなくなる。
  sameSite: 'strict' // Cross-siteリクエストを禁止
} as const
