'use client'

import { LandPlot, LayoutDashboard, LucideFootprints, Newspaper, PawPrint, Rabbit, ShoppingBag, Ticket, User, UserCog, UtensilsCrossed } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const adminSidebarLinks = [
  {
    icon: <LayoutDashboard className="w-6 h-6"/>,
    route: '/dashboard',
    label: 'Overview'
  },
  {
    icon: <LucideFootprints className="w-6 h-6"/>,
    route: '/dashboard/visitors',
    label: 'Visitors'
  },
  {
    icon: <UserCog className="w-6 h-6"/>,
    route: '/dashboard/staffs',
    label: 'Staffs'
  },
  {
    icon: <User className="w-6 h-6"/>,
    route: '/dashboard/zoo-trainers',
    label: 'Zoo Trainers'
  }
]

const staffSidebarLinks = [
  {
    icon: <LayoutDashboard className="w-6 h-6"/>,
    route: '/dashboard',
    label: 'Overview'
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
    icon: <PawPrint className="w-6 h-6"/>,
    route: '/dashboard/types',
    label: 'Animal Types'
  },
  {
    icon: <Rabbit className="w-6 h-6"/>,
    route: '/dashboard/animals',
    label: 'Animals'
  },
  {
    icon: <ShoppingBag className="w-6 h-6"/>,
    route: '/dashboard/species',
    label: 'Species'
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
  },
  {
    icon: <ShoppingBag className="w-6 h-6"/>,
    route: '/dashboard/order',
    label: 'Orders'
  }
]

const zooTrainerSidebarLinks = [
  {
    icon: <LayoutDashboard className="w-6 h-6"/>,
    route: '/dashboard',
    label: 'Overview'
  },
  {
    icon: <UtensilsCrossed className="w-6 h-6"/>,
    route: '/dashboard/diets',
    label: 'Diets'
  },
]
//1 staff
//2 zoo
//3 user
//4 admin

function LeftSidebar({ roleId= 3 }) {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarLinks = roleId === 4
  ? adminSidebarLinks : roleId === 1
  ? staffSidebarLinks : roleId === 2
  ? zooTrainerSidebarLinks : [];
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