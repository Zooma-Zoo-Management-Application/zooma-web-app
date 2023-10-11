'use client'

import { LandPlot, LayoutDashboard, Newspaper, Rabbit, Ticket, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarLinks = [
  {
    icon: <LayoutDashboard className="w-6 h-6"/>,
    route: '/dashboard/overview',
    label: 'Overview'
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

  return (
    <section className='custom-scrollbar
    sticky left-0 top-24 z-20 px-6 flex w-fit flex-col justify-between overflow-auto bg-white-500 border-r border-r-gray-200 pb-5 pt-10 max-md:hidden
    '>
      <div className='flex w-full flex-1 flex-col gap-4 px-0 xl:px-6'>
        {sidebarLinks.map((link) => {
          const isActive = 
          (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          
          return (
              <Link 
                href={link.route} 
                key={link.label} 
                className={`relative flex justify-start gap-4 rounded-sm p-4 ${isActive && 'bg-primary text-white-500'}`}
              >
                {link.icon}
                <p className=' max-lg:hidden text-base font-semibold'>{link.label}</p>
              </Link>
          );
        })}
      </div>
    </section>
  )
}

export default LeftSidebar