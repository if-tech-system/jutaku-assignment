import {
  NEXT_PUBLIC_SUPABASE_ANON_KEY,
  NEXT_PUBLIC_SUPABASE_URL
} from '~/util/env'

import { createBrowserClient } from '@supabase/ssr'

// フロント用のSupabaseクライアント。できればサーバー側で使う。
export const supabase = createBrowserClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY
)
