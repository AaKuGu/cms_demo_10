"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { LayoutDashboard, Store, Settings, Menu, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Shop_Sidebar_Menus } from "@/config/SidebarMenus";

const NAV_ITEMS = Shop_Sidebar_Menus;

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { shopId } = useParams();

    console.log(shopId); // "lskdjflsdjfsldkf"

    return (
        <>
            {/* Mobile top bar */}
            <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-3 md:hidden">
                <span className="text-base font-semibold text-neutral-900">
                    {siteConfig.name}
                </span>
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open menu"
                    className="rounded-md p-2 text-neutral-700 hover:bg-neutral-100"
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
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-neutral-200 bg-white transition-transform duration-200 ease-in-out md:static md:z-auto md:w-64 md:translate-x-0 md:shadow-none
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between px-5 py-5">
                    <span className="text-lg font-semibold tracking-tight text-neutral-900">
                        {siteConfig.name}
                    </span>
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
                        const isActive = pathname === href;
                        return (
                            <Link
                                key={href}
                                href={`/shop-manage/${shopId}/${href}`}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors
                ${isActive
                                        ? "bg-neutral-900 text-white"
                                        : "text-neutral-700 hover:bg-neutral-100"
                                    }`}
                            >
                                <Icon size={18} strokeWidth={isActive ? 2.25 : 2} />
                                {label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-neutral-200 px-5 py-4 text-xs text-neutral-400">
                    &copy; {new Date().getFullYear()} Acme Inc.
                </div>
            </aside>
        </>
    );
}