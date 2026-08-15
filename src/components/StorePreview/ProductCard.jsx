"use client";

import { useState } from "react";

const ProductCard = ({ product, showPricing, getProductWhatsappLink }) => {
    const images = product.images || [];
    const [currentIndex, setCurrentIndex] = useState(0);

    const hasMultipleImages = images.length > 1;

    const goPrev = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goNext = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="group">
            <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#F3EAD9] shadow-[0_1px_2px_rgba(36,26,21,0.06)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_24px_-8px_rgba(122,31,61,0.25)]">
                {images.length > 0 ? (
                    <img
                        src={images[currentIndex]}
                        alt={product.name}
                        className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.04]"
                    />
                ) : (
                    <svg
                        className="h-9 w-9 text-[#C9B79A]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6h16v12H4V6z"
                        />
                    </svg>
                )}

                {hasMultipleImages && (
                    <>
                        <button
                            type="button"
                            onClick={goPrev}
                            aria-label="Previous image"
                            className="absolute left-1.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#241A15] shadow-sm backdrop-blur-sm transition hover:bg-white sm:h-7 sm:w-7"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={goNext}
                            aria-label="Next image"
                            className="absolute right-1.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-[#241A15] shadow-sm backdrop-blur-sm transition hover:bg-white sm:h-7 sm:w-7"
                        >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>

                        <div className="absolute bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1">
                            {images.map((_, i) => (
                                <span
                                    key={i}
                                    className={`h-1 w-1 rounded-full transition ${i === currentIndex ? "bg-white" : "bg-white/50"
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="mt-2.5 sm:mt-3.5">
                <h3 className="line-clamp-1 text-xs font-medium leading-snug text-[#241A15] sm:text-sm">
                    {product.name}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-xs leading-snug text-[#AB9C8C]">
                    {product.desc}
                </p>

                <div className={`mt-1.5 flex items-center sm:mt-2 ${showPricing ? "justify-between" : "justify-end"}`}>
                    {showPricing && (
                        <p className="text-xs font-semibold tabular-nums text-[#7A1F3D] sm:text-sm">
                            ₹{product.price.toLocaleString("en-IN")}
                        </p>
                    )}

                    <a
                        href={getProductWhatsappLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ask about ${product.name} on WhatsApp`}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500 text-white shadow-sm transition duration-200 hover:bg-green-600 hover:shadow-md active:scale-[0.93] sm:h-8 sm:w-8"
                    >
                        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 003.85 1h0a7.94 7.94 0 007.94-7.94 7.9 7.9 0 00-2.35-5.62zm-5.55 12.2h0a6.6 6.6 0 01-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.6 6.6 0 01-1-3.5A6.6 6.6 0 0117.6 7.24a6.56 6.56 0 011.94 4.66 6.6 6.6 0 01-6.6 6.62zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64s-.32-.1-.45.1-.5.63-.62.77-.23.15-.43.05a5.4 5.4 0 01-1.6-1 6 6 0 01-1.1-1.37c-.12-.2 0-.3.09-.4s.2-.24.3-.36a1.4 1.4 0 00.2-.34.4.4 0 000-.36c-.05-.1-.45-1.08-.62-1.48s-.33-.33-.45-.33h-.4a.75.75 0 00-.55.26 2.3 2.3 0 00-.72 1.7 4 4 0 00.85 2.1 9.2 9.2 0 003.53 3.1c.5.2.9.33 1.2.42a2.9 2.9 0 001.33.08 2.2 2.2 0 001.43-1 1.8 1.8 0 00.12-1c-.05-.1-.18-.15-.38-.25z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div >
    );
};

export default ProductCard;