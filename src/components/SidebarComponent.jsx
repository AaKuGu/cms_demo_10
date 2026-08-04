"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Main_Sidebar_Menus, Shop_Sidebar_Menus } from "@/config/SidebarMenus";

export default function SidebarComponent({ prop }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { shopId } = useParams();

    const NAV_ITEMS = prop === "main" ? Main_Sidebar_Menus : Shop_Sidebar_Menus;

    return (
        <>
            {/* Mobile top bar */}
            <div className="flex items-center justify-between border-b border-border bg-white px-2 py-1 md:px-4 md:py-3 md:hidden">
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open menu"
                    className="rounded-md p-1 text-neutral-700 hover:bg-neutral-100"
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar: fixed drawer on mobile, static column on desktop */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-white transition-transform duration-200 ease-in-out md:static md:z-auto md:w-64 md:translate-x-0 md:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between px-5 py-5">
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close menu"
                        className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 md:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 px-3">
                    {NAV_ITEMS.map(({ label, href, icon: Icon }) => {

                        const actual_href = prop === "main" ? href : `/shop-manage/${shopId}/${href}`;

                        const isActive = pathname === actual_href;
                        return (
                            <Link
                                key={actual_href}
                                href={actual_href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 rounded-md border-l-4 px-3 py-2.5 text-sm font-medium transition-colors
                ${isActive
                                        ? "border-primary bg-black text-white"
                                        : "border-transparent text-neutral-700 hover:bg-neutral-100"
                                    }`}
                            >
                                <Icon
                                    size={18}
                                    strokeWidth={isActive ? 2.25 : 2}
                                    className={isActive ? "text-primary" : ""}
                                />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-border px-5 py-4 text-xs text-neutral-400">
                    &copy; {new Date().getFullYear()} {siteConfig.name}
                </div>
            </aside>
        </>
    );
}