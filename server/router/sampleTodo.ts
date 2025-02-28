import { z } from 'zod'
import { router } from '~/lib/trpc/trpc'
import { userProcedure, adminProcedure } from '../middleware'
import { todoRepository } from '../repository/sampleTodo'
import { TRPCError } from '@trpc/server'

export const todoRouter = router({
  list: userProcedure.query(async () => {
    return await todoRepository.findMany()
  }),
  find: userProcedure.input(z.string()).query(async ({ input }) => {
    return await todoRepository.findUnique(input)
  }),
  create: userProcedure
    .input(
      z.object({
        title: z.string(),
        completed: z.boolean().optional()
      })
    )
    .mutation(async ({ input, ctx: { userId } }) => {
      return await todoRepository.create({
        ...input,
        user: {
          connect: {
            id: userId
          }
        }
      })
    }),
  update: userProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        completed: z.boolean().optional()
      })
    )
    .mutation(async ({ input, ctx: { userId } }) => {
      const { id, ...data } = input
      const todo = await todoRepository.findUnique(input.id)
      if (!todo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Todo not found'
        })
      }
      if (todo.userId !== userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to delete this todo'
        })
      }
      return await todoRepository.update({
        id,
        data
      })
    }),
  delete: adminProcedure
    .input(z.string())
    .mutation(async ({ input, ctx: { userId } }) => {
      const todo = await todoRepository.findUnique(input)
      if (!todo) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Todo not found'
        })
      }
      if (todo.userId !== userId) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You are not allowed to delete this todo'
        })
      }
      return await todoRepository.delete(input)
    })
})
