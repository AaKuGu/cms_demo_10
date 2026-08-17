import { routes } from "@/lib/routes/routes";
import {
  LayoutDashboard,
  Store,
  Package,
  Tags,
  Share2,
  Phone,
  Info,
  Users,
} from "lucide-react";

export const Main_Sidebar_Menus = [
  { label: "Shops", getHref: () => routes.shops, icon: Store },
];

export const Shop_Sidebar_Menus = [
  { label: "Live View", getHref: routes.live, icon: LayoutDashboard },
  { label: "Categories", getHref: routes.categories, icon: Tags },
  { label: "Products", getHref: routes.products, icon: Package },
  { label: "Team", getHref: routes.team, icon: Users },
  { label: "Socials", getHref: routes.socials, icon: Share2 },
  { label: "Contact Us", getHref: routes.contactUs, icon: Phone },
  { label: "About Us", getHref: routes.aboutUs, icon: Info },
];