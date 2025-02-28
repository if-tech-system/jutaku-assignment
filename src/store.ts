import type { User } from '@supabase/supabase-js'
import { create } from 'zustand'

type UserState = {
  user: User | null
}
type UserAction = {
  setUser: (user: UserState['user']) => void
}
// stateの定義と更新ロジックを含むストアを作成。
export const useUserStore = create<UserState & UserAction>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}))
