import { LayoutDashboard, Store, Settings, Menu, X, Package, ShoppingCart, Tags } from "lucide-react";

export const Main_Sidebar_Menus = [
    { label: "Shops", href: "/shops", icon: Store },
];

export const Shop_Sidebar_Menus = [
    { label: "Store Preview", href: "storePreview", icon: LayoutDashboard },
    { label: "Products", href: "products", icon: Package },
    { label: "Categories", href: "categories", icon: Tags }
];