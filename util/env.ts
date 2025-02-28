// 環境
export const isProd = process.env.VERCEL_ENV === 'production'
export const isPreview = process.env.VERCEL_ENV === 'preview'
export const isDevelopment = process.env.VERCEL_ENV === 'development'
export const isLocal = !!process.env.IS_LOCAL

export const isTest = process.env.NODE_ENV === 'test'
export const env = isProd
  ? 'production'
  : isPreview
    ? 'preview'
    : isDevelopment
      ? 'deveplopment'
      : isTest
        ? 'test'
        : 'local'
export const isBuild = process.env.NEXT_BUILD === 'true'

export const isMobile = typeof window !== 'undefined' && window.innerWidth < 600

export const isServer = typeof window === 'undefined'

export const NEXT_PUBLIC_ORIGIN = process.env.NEXT_PUBLIC_ORIGIN ?? ''

// Basic Auth
export const IS_ENABLE_BASIC_AUTH = process.env.IS_ENABLE_BASIC_AUTH ?? 'false'
export const BASIC_AUTH_USERNAME = process.env.BASIC_AUTH_USERNAME ?? ''
export const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD ?? ''

// Supabase
export const NEXT_PUBLIC_SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
export const NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

// CORS
export const CORS_PROD_URL = process.env.CORS_PROD_URL ?? ''
export const CORS_PREV_URL = process.env.CORS_PREV_URL ?? ''
export const CORS_DEV_URL = process.env.CORS_DEV_URL ?? ''
export const CORS_LOCAL_URL = process.env.CORS_LOCAL_URL ?? ''

// Vercel EdgeConfg
export const EDGE_CONFIG = process.env.EDGE_CONFIG ?? ''
