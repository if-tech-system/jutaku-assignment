import { t } from '~/lib/trpc/trpc'

export const loggingMiddleware = t.middleware(async ({ path, next }) => {
  console.log(`tRPC Request path: ${path}`)
  return next()
})
