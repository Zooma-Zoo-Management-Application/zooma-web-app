"use client"

import ScrollToTopButton from '@/components/shared/ScrollToTopButton'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
        <title>Zooma - Landing Page</title>
        <body>
          {children}
          {/* <Footer /> */}
          <ScrollToTopButton />
          <Toaster />
        </body>
    </html>
  )
}
