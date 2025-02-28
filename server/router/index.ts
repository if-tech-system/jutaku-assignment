import { router } from '~/lib/trpc/trpc'
import { adminProcedure, publicProcedure, userProcedure } from '../middleware'
import { userRouter } from './user'
import { todoRouter } from './sampleTodo'
/**
 * このファイルは、ルーターを定義するためのファイルです。
 * ルーターは、クライアントからのリクエストを受け取り、
 * リクエストに応じた処理を行います。
 * v10のドキュメントを参照してください。
 * https://trpc.io/docs/v10/
 * */
export const appRouter = router({
  user: userRouter,
  hello: publicProcedure.query(() => ({ msg: 'Hello World' })),
  todo: todoRouter, // 追加
  userInfo: userProcedure.query(({ ctx: { supabaseUser } }) => {
    return supabaseUser
  }),
  adminInfo: adminProcedure.query(({ ctx: { supabaseUser } }) => {
    return supabaseUser
  })
})

export type AppRouter = typeof appRouter
