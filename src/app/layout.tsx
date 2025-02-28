import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TRPCProvider } from '~/lib/trpc/client-api'
import '@mantine/core/styles.css'
import { Box, ColorSchemeScript, Flex, MantineProvider } from '@mantine/core'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Template App',
  description: 'Template App Description'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TRPCProvider>
      <html lang="ja" data-mantine-color-scheme="light">
        <head>
          <ColorSchemeScript />
        </head>
        <body className={inter.className}>
          <MantineProvider>
            <Flex h="100vh">
              <Box h="100vh" style={{ flex: 1, overflowY: 'auto' }}>
                {children}
              </Box>
            </Flex>
          </MantineProvider>
        </body>
      </html>
    </TRPCProvider>
  )
}
