"use client";

import { FaWhatsapp, FaPhone } from "react-icons/fa";

const FloatingQuickContact = ({ phone, whatsappMessage }) => {
    if (!phone) return null;

    return (
        <div className="fixed bottom-6 right-2 z-40 flex flex-col gap-2.5 sm:bottom-8 sm:right-3 sm:gap-3 lg:right-5 lg:bottom-10">
            <a
                href={`https://wa.me/91${phone}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#241A15] text-white shadow-md ring-1 ring-black/10 transition duration-200 hover:translate-x-0.5 hover:bg-green-600 hover:shadow-lg"
            >
                <FaWhatsapp className="h-4 w-4" />
            </a>
            <a
                href={`tel:${phone}`}
                aria-label="Call the store"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#241A15] text-white shadow-md ring-1 ring-black/10 transition duration-200 hover:translate-x-0.5 hover:bg-[#7A1F3D] hover:shadow-lg"
            >
                <FaPhone className="h-4 w-4" />
            </a>
        </div>
    );
};

export default FloatingQuickContact;