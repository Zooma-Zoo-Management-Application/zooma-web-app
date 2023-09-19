import ScrollToTopButton from '@/components/shared/scroll-to-top-button'
import '@/styles/globals.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
        <body>
          {children}
          <ScrollToTopButton />
        </body>
    </html>
  )
}
