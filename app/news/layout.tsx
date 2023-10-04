import Header from "@/components/Header"

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
          <div className="max-w-screen-xl mt-20 px-8 xl:px-16 mx-auto bg-white-500 mb-20 rounded-sm">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
