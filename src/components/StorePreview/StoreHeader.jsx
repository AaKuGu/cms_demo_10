"use client";

const StoreHeader = ({ shop, whatsappMessage }) => {
    return (
        <div className="relative shrink-0 bg-gradient-to-b from-[#FBF7F0] to-white">
            <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-9 lg:px-8">
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
                    <div className="flex justify-start">
                        {shop.logo ? (
                            <img
                                src={shop.logo}
                                alt={shop.name}
                                className="h-12 w-12 rounded-full object-cover ring-2 ring-[#B8873B]/40 ring-offset-2 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
                            />
                        ) : (
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7A1F3D] to-[#5E1730] text-base font-medium tracking-tight text-white ring-2 ring-[#B8873B]/40 ring-offset-2 sm:h-16 sm:w-16 sm:text-xl lg:h-[4.5rem] lg:w-[4.5rem] lg:text-2xl">
                                {shop.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div className="flex min-w-0 flex-col items-center text-center">
                        <h1 className="font-serif text-xl leading-tight tracking-tight text-[#241A15] sm:text-3xl lg:text-[2.75rem]">
                            {shop.name.replace(/_/g, " ")}
                        </h1>

                        {shop.address && (
                            <p className="mt-1.5 flex max-w-full items-center gap-1.5 text-xs text-[#948676] sm:mt-2.5 sm:text-sm">
                                <svg
                                    className="h-3.5 w-3.5 shrink-0 text-[#B8873B] sm:h-4 sm:w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                                    />
                                </svg>
                                <span className="line-clamp-1">{shop.address}</span>
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end">
                        {shop.phone && (
                            <a
                                href={`https://wa.me/91${shop.phone}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-2 text-xs font-medium text-white shadow-sm transition duration-200 hover:bg-green-600 hover:shadow-md active:scale-[0.97] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
                            >
                                <svg className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 003.85 1h0a7.94 7.94 0 007.94-7.94 7.9 7.9 0 00-2.35-5.62zm-5.55 12.2h0a6.6 6.6 0 01-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.6 6.6 0 01-1-3.5A6.6 6.6 0 0117.6 7.24a6.56 6.56 0 011.94 4.66 6.6 6.6 0 01-6.6 6.62zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64s-.32-.1-.45.1-.5.63-.62.77-.23.15-.43.05a5.4 5.4 0 01-1.6-1 6 6 0 01-1.1-1.37c-.12-.2 0-.3.09-.4s.2-.24.3-.36a1.4 1.4 0 00.2-.34.4.4 0 000-.36c-.05-.1-.45-1.08-.62-1.48s-.33-.33-.45-.33h-.4a.75.75 0 00-.55.26 2.3 2.3 0 00-.72 1.7 4 4 0 00.85 2.1 9.2 9.2 0 003.53 3.1c.5.2.9.33 1.2.42a2.9 2.9 0 001.33.08 2.2 2.2 0 001.43-1 1.8 1.8 0 00.12-1c-.05-.1-.18-.15-.38-.25z" />
                                </svg>
                                <span className="hidden sm:inline">Chat</span>
                            </a>
                        )}
                    </div>
                </div>

                <nav className="mt-5 flex items-center justify-center gap-6 border-t border-[#B8873B]/20 pt-4 sm:mt-7 sm:gap-10 sm:pt-5">
                    {[
                        { label: "About us", href: "#about" },
                        { label: "Products", href: "#products" },
                        { label: "Contact us", href: "#contact" },
                    ].map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="relative text-xs font-medium uppercase tracking-[0.12em] text-[#5C4A3A] transition-colors duration-200 hover:text-[#7A1F3D] sm:text-sm"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>

            <div className="h-[3px] w-full bg-gradient-to-r from-[#B8873B] via-[#7A1F3D] to-[#B8873B]" />
        </div>
    );
};

export default StoreHeader;