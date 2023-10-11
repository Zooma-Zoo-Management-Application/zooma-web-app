'use client'

import useUIState from '@/stores/ui-store'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from './components/Header'
import LeftSidebar from './components/LeftSidebar'
import { Card } from '@/components/ui/card'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpenSidebar, setIsOpenSidebar } = useUIState();

  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<any>([]);
  const pathname = usePathname()

  console.log("pathname",pathname)

  useEffect(() => {
    let pathArray = pathname.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [pathname]);

  return (
    <html lang="en">
      <body>
      <Header />
      <main className='flex flex-row'>
          <div className='w-fit'>
            <LeftSidebar />
          </div>
          <section className="flex min-h-screen w-full flex-1 flex-col items-center max-md:pb-32 sm:px-10">
            {children}
          </section>
        </main>
      </body>
    </html>
  )
}
