"use client";

import { FaEnvelope, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { CONTACT_NUMBER_ICON_MAP } from "./storePreview.utils";

const getContactNumberHref = (entry) => {
    return entry.type === "whatsapp"
        ? `https://wa.me/${entry.number.replace(/\D/g, "")}`
        : `tel:${entry.number}`;
};

const ContactSection = ({ contact, mapEmbedSrc }) => {
    if (!contact) return null;

    return (
        <div className="border-t border-[#ECE2D2] bg-white">
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                <p className="mb-5 text-center font-serif text-lg text-[#241A15] sm:text-xl">
                    Get in touch
                </p>

                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#6B5D4F]">
                    {contact.email && (
                        <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-2 hover:text-[#7A1F3D]"
                        >
                            <FaEnvelope className="h-3.5 w-3.5 text-[#B8873B]" />
                            {contact.email}
                        </a>
                    )}

                    {contact.contactNumbers?.map((entry, index) => {
                        const Icon = CONTACT_NUMBER_ICON_MAP[entry.type] || CONTACT_NUMBER_ICON_MAP.phone;
                        return (
                            <a
                                key={`${entry.type}-${index}`}
                                href={getContactNumberHref(entry)}
                                target={entry.type === "whatsapp" ? "_blank" : undefined}
                                rel={entry.type === "whatsapp" ? "noopener noreferrer" : undefined}
                                className="flex items-center gap-2 hover:text-[#7A1F3D]"
                            >
                                <Icon className="h-3.5 w-3.5 text-[#B8873B]" />
                                {entry.number}
                            </a>
                        );
                    })}

                    {contact.workingHours && (
                        <span className="flex items-center gap-2">
                            <FaClock className="h-3.5 w-3.5 text-[#B8873B]" />
                            {contact.workingHours}
                        </span>
                    )}

                    {contact.googleMapLink && (
                        <a
                            href={contact.googleMapLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-[#7A1F3D]"
                        >
                            <FaMapMarkerAlt className="h-3.5 w-3.5 text-[#B8873B]" />
                            Open in Google Maps
                        </a>
                    )}
                </div>

                {mapEmbedSrc && (
                    <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-[#ECE2D2]">
                        <iframe
                            title="Store location"
                            src={mapEmbedSrc}
                            width="100%"
                            height="280"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                            className="block"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactSection;