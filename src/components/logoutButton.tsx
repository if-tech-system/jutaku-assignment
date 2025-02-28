'use client'
import { signOut } from '@/serverActions/supabaseAuth'
export const LogoutButton = () => {
  return <button onClick={() => signOut()}>ログアウト</button>
}
