import {
  LayoutDashboard,
  Store,
  Package,
  Tags,
  Share2,
  Phone,
  Info,
} from "lucide-react";

export const Main_Sidebar_Menus = [
  { label: "Shops", href: "/shops", icon: Store },
];

export const Shop_Sidebar_Menus = [
  { label: "Live View", href: "live", icon: LayoutDashboard },
  { label: "Store Preview", href: "storePreview", icon: LayoutDashboard },
  { label: "Products", href: "products", icon: Package },
  { label: "Categories", href: "categories", icon: Tags },
  { label: "Socials", href: "socials", icon: Share2 },
  { label: "Contact", href: "contact", icon: Phone },
  { label: "About Us", href: "about", icon: Info },
];