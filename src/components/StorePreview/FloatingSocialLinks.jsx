"use client";

import { PLATFORM_ICON_MAP } from "./storePreview.utils";

const FloatingSocialLinks = ({ links = [] }) => {
    if (links.length === 0) return null;

    return (
        <div className="fixed left-2 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2.5 sm:left-3 sm:gap-3 lg:left-5">
            {links.map((link, index) => {
                const Icon = PLATFORM_ICON_MAP[link.platform];
                if (!Icon) return null;
                return (
                    <a
                        key={`${link.platform}-${index}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.platform}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#241A15] text-white shadow-md ring-1 ring-black/10 transition duration-200 hover:-translate-x-0.5 hover:bg-[#7A1F3D] hover:shadow-lg"
                    >
                        <Icon className="h-4 w-4" />
                    </a>
                );
            })}
        </div>
    );
};

export default FloatingSocialLinks;