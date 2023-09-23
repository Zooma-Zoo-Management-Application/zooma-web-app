import Footer from '@/components/Footer'
import ScrollToTopButton from '@/components/scroll-to-top-button'
import '@/styles/globals.scss'
import Head from './head'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <Head />
        <body>
          {children}
          {/* <Footer /> */}
          <ScrollToTopButton />
        </body>
    </html>
  )
}
