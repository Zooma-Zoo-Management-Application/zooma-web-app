import Header from "@/components/shared/Header"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <title>Zooma - Landing Page</title>
      <body>
        <Header />
        <div className="background-texture py-20" >
          <div className="max-w-screen-xl mt-20 sm:px-8 xl:px-16 mx-auto mb-20 rounded-sm px-2">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
