'use client'

import Breadcrumb from '@/components/shared/Breadcrumb'
import BreadcrumbItem from '@/components/shared/BreadcrumbItem'
import useUIState from '@/stores/ui-store'
import useUserState from '@/stores/user-store'
import { usePathname, useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import LeftSidebar from './components/LeftSidebar'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserNav } from '@/components/shared/UserNav'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpenSidebar, setIsOpenSidebar } = useUIState();

  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<any>([]);
  const pathname = usePathname()

  const { currentUser } = useUserState();

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
      <title>Zooma - Dashboard</title>
      <body>
        <main className='flex flex-row items-start'>
            <div className='w-fit custom-scrollbar sticky left-0 top-0 z-[1000]'>
              <LeftSidebar />
            </div>
            <div className="flex min-h-screen w-full flex-1 flex-col items-start max-md:pb-32">
              <div className='z-[1] flex justify-between items-center w-full p-4 sticky top-0 mt-2 bg-white-500 border-b border-b-gray-200'>
                <div className='flex-col'>
                {/* <h2 className="text-3xl font-bold tracking-tight ml-5">News Management</h2> */}
                  <Breadcrumb>
                    {/* <BreadcrumbItem href="/">Home</BreadcrumbItem> */}
                    {breadcrumbs &&
                      breadcrumbs.map((breadcrumb:any) => (
                        <BreadcrumbItem key={breadcrumb.href} href={breadcrumb.href}>
                          {breadcrumb.label}
                        </BreadcrumbItem>
                      ))}
                  </Breadcrumb>
                </div>
                <div className="font-medium mr-4">
                {
                  currentUser ? (
                    <Fragment>
                      <UserNav user={currentUser} />
                    </Fragment>

                  ) : (
                    <Link href="/authentication/login">
                      <Button className={"capitalize tracking-wide transition-all"
                  }
                      >
                        Login
                      </Button>
                    </Link>
                  )
                }
                </div>
              </div>
              {children}
            </div>
          </main>
      </body>
    </html>
  )
}
