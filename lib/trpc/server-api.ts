import { httpBatchLink } from '@trpc/client'
import { appRouter } from '~/server/router'
import { t } from './trpc'

const createCaller = t.createCallerFactory(appRouter)
export const serverApi = () => {
  return createCaller({
    links: [httpBatchLink({ url: '/api/trpc' })]
  })
}
