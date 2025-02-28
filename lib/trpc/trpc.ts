import type { User } from '@supabase/supabase-js'
import type { TRPCLink } from '@trpc/client'
import { type AnyRouter, initTRPC } from '@trpc/server'

export type MyContext = {
  req?: Request
  links?: TRPCLink<AnyRouter>[]
  supabaseUser?: User
}

export const t = initTRPC.context<MyContext>().create()
export const router = t.router
