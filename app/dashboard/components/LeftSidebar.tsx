'use client'

import { LandPlot, LayoutDashboard, Newspaper, Rabbit, Ticket, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const sidebarLinks = [
  {
    icon: <LayoutDashboard className="w-6 h-6"/>,
    route: '/dashboard',
    label: 'Overview'
  },
  {
    icon: <User className="w-6 h-6"/>,
    route: '/dashboard/visitor',
    label: 'Visitor'
  },
  {
    icon: <User className="w-6 h-6"/>,
    route: '/dashboard/users',
    label: 'Users'
  },
  {
    icon: <User className="w-6 h-6"/>,
    route: '/dashboard/zoo-trainers',
    label: 'Zoo Trainers'
  },
  {
    icon: <LandPlot className="w-6 h-6"/>,
    route: '/dashboard/areas',
    label: 'Areas'
  },
  {
    icon: <LayoutDashboard className="w-6 h-6"/>,
    route: '/dashboard/cages',
    label: 'Cages'
  },
  {
    icon: <Rabbit className="w-6 h-6"/>,
    route: '/dashboard/animals',
    label: 'Animals'
  },
  {
    icon: <Ticket className="w-6 h-6"/>,
    route: '/dashboard/tickets',
    label: 'Tickets'
  },
  {
    icon: <Newspaper className="w-6 h-6"/>,
    route: '/dashboard/news',
    label: 'News'
  }
]

function LeftSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <section className='custom-scrollbar
    sticky left-0 top-0 z-20 px-6 flex w-fit flex-col justify-between overflow-auto bg-white-500 border-r border-r-gray-200 pb-5 pt-5 max-md:hidden
    '>
      <div className='flex w-full flex-1 flex-col gap-2 px-0 xl:px-6'>
        <div className="cursor-pointer relative w-full h-full mx-auto hidden items-center justify-center lg:flex"
            onClick={() => router.push("/dashboard")}
          >
          <Image
            src="/logos/Zooma_Black_Text.svg"
            alt="logo"
            width={150}
            height={50}
          />
        </div>
        <div className="cursor-pointer relative w-full h-full mx-auto flex items-center justify-center lg:hidden"
            onClick={() => router.push("/dashboard")}
          >
          <Image
            src="/logos/Zooma_Black.svg"
            alt="logo"
            width={50}
            height={50}
          />
        </div>
        {sidebarLinks.map((link) => {
          const isActive = 
          (pathname.includes(link.route) && link.route.length == pathname.length) ||
            pathname === link.route;
          
          return (
              <Link 
                href={link.route} 
                key={link.label} 
                className={`relative flex justify-start gap-4 rounded-sm p-4 ${isActive && 'bg-primary/20 border-l-8 border-primary text-primary'}`}
              >
                {link.icon}
                <p className=' max-lg:hidden text-base font-semibold whitespace-nowrap'>{link.label}</p>
              </Link>
          );
        })}
      </div>
    </section>
  )
}

export default LeftSidebar