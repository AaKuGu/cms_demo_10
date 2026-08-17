"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes/routes";

const navItems = [
    { label: "Shops", href: routes.shops },
    { label: "Team", href: routes.team },
];

export default function WorkspaceNavbar({ workspaceContext }) {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur-md">
            <nav className="mx-auto flex max-w-7xl items-center gap-1 px-4 py-1">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${pathname === item.href
                            ? "bg-gray-100 text-gray-900 font-medium"
                            : "text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}

                {workspaceContext && (
                    <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${workspaceContext.isOwn
                            ? "bg-blue-50 text-blue-600"
                            : "bg-violet-50 text-violet-600"
                            }`}
                    >
                        {workspaceContext.isOwn ? "Your stores" : `Managing: ${workspaceContext.businessName}`}
                    </span>
                )}
            </nav>
        </header>
    );
}