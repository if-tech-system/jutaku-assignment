import { Container } from '@mantine/core'
import type { ReactNode } from 'react'

export default function ProjectsLayout({
  children
}: { readonly children: ReactNode }) {
  return (
    <Container size="responsive" maw="1100" pt="5rem">
      {children}
    </Container>
  )
}
