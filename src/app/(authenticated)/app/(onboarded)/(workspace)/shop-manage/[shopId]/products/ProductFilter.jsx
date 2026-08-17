// components/ProductFilter.jsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";


export default function ProductFilter({ categories = [] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const [name, setName] = useState(searchParams.get("name") || "");

    // debounce name input -> URL
    useEffect(() => {
        const timeout = setTimeout(() => {
            updateParam("name", name);
        }, 400);
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name]);

    const updateParam = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`);
        });
    };

    return (
        <div className="flex flex-wrap items-center gap-3 my-4">
            <input
                type="text"
                placeholder="Search by name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
            />

            <select
                defaultValue={searchParams.get("categoryId") || ""}
                onChange={(e) => updateParam("categoryId", e.target.value)}
                className="border rounded px-3 py-2 text-sm"
            >
                <option value="">All Categories</option>
                {categories.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                ))}
            </select>

            {isPending && <span className="text-xs text-gray-400">Updating…</span>}
        </div>
    );
}