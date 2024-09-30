import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  CurrencyDollarIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

export const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

export const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  {
    name: "Clients",
    href: "/dashboard/clients",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Finance",
    href: "/dashboard/finance",
    icon: CurrencyDollarIcon,
    current: false,
  },
  {
    name: "Orders",
    href: "/dashboard/orders",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: FolderIcon,
    current: false,
  },

  {
    name: "Labels",
    href: "/labels",
    icon: BookmarkIcon,
    current: false,
  },
];
