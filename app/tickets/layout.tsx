import Header from "@/components/shared/Header"
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <title>Zooma - Ticket Page</title>
      <body>
        {children}
      </body>
      <Toaster />
    </html>
  )
}
