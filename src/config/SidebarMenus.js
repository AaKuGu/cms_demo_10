import { LayoutDashboard, Store, Settings, Menu, X, Package, ShoppingCart, Tags } from "lucide-react";

export const Main_Sidebar_Menus = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Shops", href: "/shops", icon: Store },
    { label: "Settings", href: "/settings", icon: Settings },
];

export const Shop_Sidebar_Menus = [
    { label: "Dashboard", href: "dashboard", icon: LayoutDashboard },
    { label: "Store Preview", href: "storePreview", icon: LayoutDashboard },
    { label: "Orders", href: "orders", icon: ShoppingCart },
    { label: "Products", href: "products", icon: Package },
    { label: "Categories", href: "categories", icon: Tags }
];