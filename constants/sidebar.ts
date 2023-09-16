
export const sidebarStaffLinks = [
  {
    title: "Main",
    links: [
      {
        icon: '/assets/overview.svg',
        route: "/dashboard/staff",
        label: "Overview",
      }
    ]
  },
  {
    title: "Account Management",
    links: [
      {
        icon: '/assets/user.svg',
        route: "/dashboard/staff/users",
        label: "Users",
      },
      {
        icon: "/assets/overview.svg",
        route: "/dashboard/staff/zoo-trainers",
        label: "Zoo Trainers",
      },
    ]
  },
  {
    title: "Zoo Management",
    links: [
      {
        icon: '/assets/overview.svg',
        route: "/dashboard/staff/areas",
        label: "Areas",
      },
      {
        icon: "/assets/overview.svg",
        route: "/dashboard/staff/zoo-trainers",
        label: "Cages",
      },
      {
        icon: "/assets/overview.svg",
        route: "/dashboard/staff/animals",
        label: "Animals",
      },
      {
        icon: "/assets/overview.svg",
        route: "/dashboard/staff/tickets",
        label: "Tickets",
      },
    ]
  },
];