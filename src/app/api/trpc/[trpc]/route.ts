import type { MyContext } from '~/lib/trpc/trpc'
import { appRouter } from '~/server/router'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getCorsUrl } from '@/const/config'

// CORS ヘッダーを設定する関数
function setCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', getCorsUrl()) // 許可するオリジン
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS') // 許可するメソッド
  response.headers.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization'
  ) // 許可するヘッダー
  response.headers.set('Access-Control-Allow-Credentials', 'true') // Cookie を許可する場合
}

const handler = async (req: NextRequest) => {
  // OPTIONS メソッドへの対応（CORS プリフライト）
  if (req.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 })
    setCorsHeaders(response)
    return response
  }

  // 通常のリクエスト処理
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: ({ req }): MyContext => {
      return { req }
    }
  })

  // NextResponse に変換
  const nextResponse = new NextResponse(response.body, {
    status: response.status,
    headers: response.headers
  })

  // CORS ヘッダーを追加
  setCorsHeaders(nextResponse)
  return nextResponse
}

export { handler as GET, handler as POST }
