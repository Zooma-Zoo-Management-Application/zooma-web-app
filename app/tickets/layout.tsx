import Header from "@/components/shared/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <title>Zooma - Ticket Page</title>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
