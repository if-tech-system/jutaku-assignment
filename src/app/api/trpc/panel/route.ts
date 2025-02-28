import { NextResponse } from 'next/server'
import { renderTrpcPanel } from 'trpc-panel'
import { appRouter } from '~/server/router'
import { isProd } from '~/util/env'

export async function GET(req: Request) {
  if (!process.env.IS_LOCAL || isProd)
    return new NextResponse('Not Found', { status: 404 })

  return new NextResponse(
    renderTrpcPanel(appRouter, {
      url: '/api/trpc',
      transformer: 'superjson'
    }),
    {
      status: 200,
      headers: [['Content-Type', 'text/html'] as [string, string]]
    }
  )
}
