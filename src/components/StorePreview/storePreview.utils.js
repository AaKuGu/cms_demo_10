import {
    FaInstagram,
    FaFacebook,
    FaYoutube,
    FaTwitter,
    FaLinkedin,
    FaWhatsapp,
    FaTiktok,
    FaPinterest,
    FaPhone,
} from "react-icons/fa";

export const PLATFORM_ICON_MAP = {
    instagram: FaInstagram,
    facebook: FaFacebook,
    youtube: FaYoutube,
    twitter: FaTwitter,
    linkedin: FaLinkedin,
    whatsapp: FaWhatsapp,
    tiktok: FaTiktok,
    pinterest: FaPinterest,
};

export const CONTACT_NUMBER_ICON_MAP = {
    phone: FaPhone,
    whatsapp: FaWhatsapp,
};

export const getMapEmbedSrc = (googleMapLink, address) => {
    if (!googleMapLink && !address) return null;

    if (googleMapLink && googleMapLink.includes("/maps/embed")) {
        return googleMapLink;
    }

    const query = address || googleMapLink;
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
};