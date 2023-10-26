import Header from "@/components/shared/Header"
import Image from "next/image"

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
        {/* <div className="min-h-[400px] bg-gray-50 flex items-center relative overflow-hidden">
          <div className="absolute inset-0 z-[1] bg-contain h-full w-full">
            <Image 
              src="/peguin.jpg"
              width={1920}
              height={1080}
              alt="Animal"
              className="brightness-50 h-full w-full object-cover"
            />
          </div>
          <section className="w-full py-32 absolute z-10 top-10">
            <div className="container mx-auto text-center text-white">
              <h1 className="text-2xl lg:text-5xl font-medium mb-6 font-amsi text-white-500">Our Animals</h1>
              <p className="text-base lg:text-xl text-white-500">
                Welcome to Zooma, a place where you can find all the animals you want.  
              </p>  
            </div>
          </section>
        </div> */}
        <div className="background-texture py-10" >
          <div className="max-w-screen-xl sm:px-8 xl:px-16 mx-auto mb-20 rounded-sm pt-14">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
