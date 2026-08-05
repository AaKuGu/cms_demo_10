// "use client";

// import { useMemo, useState } from "react";
// import {
//     FaInstagram,
//     FaFacebook,
//     FaYoutube,
//     FaTwitter,
//     FaLinkedin,
//     FaWhatsapp,
//     FaTiktok,
//     FaPinterest,
//     FaEnvelope,
//     FaPhone,
//     FaClock,
//     FaMapMarkerAlt,
// } from "react-icons/fa";

// const PLATFORM_ICON_MAP = {
//     instagram: FaInstagram,
//     facebook: FaFacebook,
//     youtube: FaYoutube,
//     twitter: FaTwitter,
//     linkedin: FaLinkedin,
//     whatsapp: FaWhatsapp,
//     tiktok: FaTiktok,
//     pinterest: FaPinterest,
// };

// const CONTACT_NUMBER_ICON_MAP = {
//     phone: FaPhone,
//     whatsapp: FaWhatsapp,
// };

// /**
//  * Builds an embeddable Google Maps iframe src.
//  * - If the stored link is already an /maps/embed URL, use it as-is.
//  * - Otherwise fall back to the public "q=" embed endpoint, preferring the
//  *   shop's address (more reliable for embedding) and using the raw link
//  *   as a secondary fallback query.
//  */
// const getMapEmbedSrc = (googleMapLink, address) => {
//     if (!googleMapLink && !address) return null;

//     if (googleMapLink && googleMapLink.includes("/maps/embed")) {
//         return googleMapLink;
//     }

//     const query = address || googleMapLink;
//     return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
// };

// const StorePreviewView = ({ shop, categories, products, socials, contact }) => {
//     const showPricing = shop?.settings?.products?.showPricing !== false; // default true if unset

//     const visibleSocialLinks = socials?.isVisible ? socials?.links ?? [] : [];
//     const visibleContact = contact?.isVisible ? contact : null;
//     const hasContactContent =
//         visibleContact &&
//         (visibleContact.email ||
//             visibleContact.contactNumbers?.length > 0 ||
//             visibleContact.workingHours ||
//             visibleContact.googleMapLink);

//     const mapEmbedSrc = visibleContact?.googleMapLink
//         ? getMapEmbedSrc(visibleContact.googleMapLink, shop?.address)
//         : null;

//     const categoriesWithProducts = useMemo(() => {
//         return categories
//             .map((cat) => ({
//                 ...cat,
//                 products: products.filter((p) => p.categoryId === cat._id),
//             }))
//             .filter((cat) => cat.products.length > 0);
//     }, [categories, products]);

//     const [activeCategoryId, setActiveCategoryId] = useState(
//         categoriesWithProducts[0]?._id ?? null
//     );

//     const activeCategory = categoriesWithProducts.find(
//         (cat) => cat._id === activeCategoryId
//     );

//     const whatsappMessage = encodeURIComponent(
//         `Hi, I saw your store "${shop.name.replace(/_/g, " ")}" online and wanted to ask about your products.`
//     );

//     const getProductWhatsappLink = (product) => {
//         const message = encodeURIComponent(
//             showPricing
//                 ? `Hi, I'm interested in "${product.name}" (₹${product.price.toLocaleString("en-IN")}) from ${shop.name.replace(/_/g, " ")}. Iska kya price padega / is this available?`
//                 : `Hi, I'm interested in "${product.name}" from ${shop.name.replace(/_/g, " ")}. Ye kitne ka hai / what's the price and is it available?`
//         );
//         return `https://wa.me/91${shop.phone}?text=${message}`;
//     };

//     const getContactNumberHref = (entry) => {
//         return entry.type === "whatsapp"
//             ? `https://wa.me/${entry.number.replace(/\D/g, "")}`
//             : `tel:${entry.number}`;
//     };

//     return (
//         <div className="flex h-screen flex-col bg-white">
//             {/* Floating social icons — fixed to the left edge, vertically centered.
//                 Dark pill so the icon glyphs read as solid white dots against the page. */}
//             {visibleSocialLinks.length > 0 && (
//                 <div className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 sm:flex lg:left-5">
//                     {visibleSocialLinks.map((link, index) => {
//                         const Icon = PLATFORM_ICON_MAP[link.platform];
//                         if (!Icon) return null;
//                         return (
//                             <a
//                                 key={`${link.platform}-${index}`}
//                                 href={link.url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 aria-label={link.platform}
//                                 className="flex h-10 w-10 items-center justify-center rounded-full bg-[#241A15] text-white shadow-md ring-1 ring-black/10 transition duration-200 hover:-translate-x-0.5 hover:bg-[#7A1F3D] hover:shadow-lg"
//                             >
//                                 <Icon className="h-4 w-4" />
//                             </a>
//                         );
//                     })}
//                 </div>
//             )}

//             {/* Floating quick-contact icons — fixed near the bottom-right corner,
//                 stacked vertically. */}
//             {(shop.phone || visibleContact?.contactNumbers?.some((n) => n.type === "phone")) && (
//                 <div className="fixed bottom-8 right-3 z-40 hidden flex-col gap-3 sm:flex lg:right-5 lg:bottom-10">
//                     {shop.phone && (
//                         <a
//                             href={`https://wa.me/91${shop.phone}?text=${whatsappMessage}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             aria-label="Chat on WhatsApp"
//                             className="flex h-10 w-10 items-center justify-center rounded-full bg-[#241A15] text-white shadow-md ring-1 ring-black/10 transition duration-200 hover:translate-x-0.5 hover:bg-green-600 hover:shadow-lg"
//                         >
//                             <FaWhatsapp className="h-4 w-4" />
//                         </a>
//                     )}
//                     {shop.phone && (
//                         <a
//                             href={`tel:${shop.phone}`}
//                             aria-label="Call the store"
//                             className="flex h-10 w-10 items-center justify-center rounded-full bg-[#241A15] text-white shadow-md ring-1 ring-black/10 transition duration-200 hover:translate-x-0.5 hover:bg-[#7A1F3D] hover:shadow-lg"
//                         >
//                             <FaPhone className="h-4 w-4" />
//                         </a>
//                     )}
//                 </div>
//             )}

//             {/* Header — logo left, name centered, WhatsApp on the right */}
//             <div className="relative shrink-0 bg-gradient-to-b from-[#FBF7F0] to-white">
//                 <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-9 lg:px-8">
//                     <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-6">
//                         <div className="flex justify-start">
//                             {shop.logo ? (
//                                 <img
//                                     src={shop.logo}
//                                     alt={shop.name}
//                                     className="h-12 w-12 rounded-full object-cover ring-2 ring-[#B8873B]/40 ring-offset-2 sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
//                                 />
//                             ) : (
//                                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#7A1F3D] to-[#5E1730] text-base font-medium tracking-tight text-white ring-2 ring-[#B8873B]/40 ring-offset-2 sm:h-16 sm:w-16 sm:text-xl lg:h-[4.5rem] lg:w-[4.5rem] lg:text-2xl">
//                                     {shop.name.charAt(0)}
//                                 </div>
//                             )}
//                         </div>

//                         <div className="flex min-w-0 flex-col items-center text-center">
//                             <h1 className="font-serif text-xl leading-tight tracking-tight text-[#241A15] sm:text-3xl lg:text-[2.75rem]">
//                                 {shop.name.replace(/_/g, " ")}
//                             </h1>

//                             {shop.address && (
//                                 <p className="mt-1.5 flex max-w-full items-center gap-1.5 text-xs text-[#948676] sm:mt-2.5 sm:text-sm">
//                                     <svg
//                                         className="h-3.5 w-3.5 shrink-0 text-[#B8873B] sm:h-4 sm:w-4"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                         stroke="currentColor"
//                                         strokeWidth={1.5}
//                                     >
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
//                                         />
//                                         <path
//                                             strokeLinecap="round"
//                                             strokeLinejoin="round"
//                                             d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
//                                         />
//                                     </svg>
//                                     <span className="line-clamp-1">{shop.address}</span>
//                                 </p>
//                             )}
//                         </div>

//                         <div className="flex justify-end">
//                             {shop.phone && (
//                                 <a
//                                     href={`https://wa.me/91${shop.phone}?text=${whatsappMessage}`}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-2 text-xs font-medium text-white shadow-sm transition duration-200 hover:bg-green-600 hover:shadow-md active:scale-[0.97] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
//                                 >
//                                     <svg className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]" fill="currentColor" viewBox="0 0 24 24">
//                                         <path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 003.85 1h0a7.94 7.94 0 007.94-7.94 7.9 7.9 0 00-2.35-5.62zm-5.55 12.2h0a6.6 6.6 0 01-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.6 6.6 0 01-1-3.5A6.6 6.6 0 0117.6 7.24a6.56 6.56 0 011.94 4.66 6.6 6.6 0 01-6.6 6.62zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64s-.32-.1-.45.1-.5.63-.62.77-.23.15-.43.05a5.4 5.4 0 01-1.6-1 6 6 0 01-1.1-1.37c-.12-.2 0-.3.09-.4s.2-.24.3-.36a1.4 1.4 0 00.2-.34.4.4 0 000-.36c-.05-.1-.45-1.08-.62-1.48s-.33-.33-.45-.33h-.4a.75.75 0 00-.55.26 2.3 2.3 0 00-.72 1.7 4 4 0 00.85 2.1 9.2 9.2 0 003.53 3.1c.5.2.9.33 1.2.42a2.9 2.9 0 001.33.08 2.2 2.2 0 001.43-1 1.8 1.8 0 00.12-1c-.05-.1-.18-.15-.38-.25z" />
//                                     </svg>
//                                     <span className="hidden sm:inline">Chat</span>
//                                 </a>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 <div className="h-[3px] w-full bg-gradient-to-r from-[#B8873B] via-[#7A1F3D] to-[#B8873B]" />
//             </div>

//             {/* Category tabs */}
//             {categoriesWithProducts.length > 0 && (
//                 <div className="mx-auto w-full max-w-6xl shrink-0 border-b border-[#ECE2D2] bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
//                     <div className="flex gap-2 overflow-x-auto sm:gap-2.5">
//                         {categoriesWithProducts.map((cat) => {
//                             const isActive = cat._id === activeCategoryId;
//                             return (
//                                 <button
//                                     key={cat._id}
//                                     onClick={() => setActiveCategoryId(cat._id)}
//                                     className={`shrink-0 whitespace-nowrap border-b-2 px-1 pb-2 pt-1 text-base font-semibold tracking-tight transition-colors duration-150 sm:px-1.5 sm:text-lg ${isActive
//                                         ? "border-[#7A1F3D] text-[#241A15]"
//                                         : "border-transparent text-[#948676] hover:border-[#B8873B] hover:text-[#241A15]"
//                                         }`}
//                                 >
//                                     {cat.name}
//                                     <span
//                                         className={`ml-1.5 text-xs font-medium tabular-nums ${isActive ? "text-[#B8873B]" : "text-[#C9B79A]"
//                                             }`}
//                                     >
//                                         {cat.products.length}
//                                     </span>
//                                 </button>
//                             );
//                         })}
//                     </div>
//                 </div>
//             )}

//             {/* Scrollable body — products, then contact, then socials footer.
//                 This is the ONLY element that scrolls; nothing here is fixed/sticky,
//                 so the contact block can never sit on top of / block the products. */}
//             <div className="flex-1 overflow-y-auto bg-white">
//                 <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
//                     {categoriesWithProducts.length === 0 ? (
//                         <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#ECE2D2] bg-[#FBF7F0]/50 py-24 text-center">
//                             <svg
//                                 className="h-8 w-8 text-[#C9B79A]"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                                 strokeWidth={1.2}
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6h16v12H4V6z"
//                                 />
//                             </svg>
//                             <p className="mt-3 text-sm font-medium text-[#6B5D4F]">
//                                 No products yet
//                             </p>
//                             <p className="mt-1 text-xs text-[#948676]">
//                                 Items will show up here as soon as they&apos;re added.
//                             </p>
//                         </div>
//                     ) : (
//                         <>
//                             {activeCategory?.description && (
//                                 <p className="mb-7 max-w-lg text-sm leading-relaxed text-[#948676]">
//                                     {activeCategory.description}
//                                 </p>
//                             )}

//                             <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-9">
//                                 {activeCategory?.products.map((product) => (
//                                     <div key={product._id} className="group">
//                                         <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#F3EAD9] shadow-[0_1px_2px_rgba(36,26,21,0.06)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_24px_-8px_rgba(122,31,61,0.25)]">
//                                             {product.image ? (
//                                                 <img
//                                                     src={product.image}
//                                                     alt={product.name}
//                                                     className="h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.04]"
//                                                 />
//                                             ) : (
//                                                 <svg
//                                                     className="h-9 w-9 text-[#C9B79A]"
//                                                     fill="none"
//                                                     viewBox="0 0 24 24"
//                                                     stroke="currentColor"
//                                                     strokeWidth={1.2}
//                                                 >
//                                                     <path
//                                                         strokeLinecap="round"
//                                                         strokeLinejoin="round"
//                                                         d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M4 6h16v12H4V6z"
//                                                     />
//                                                 </svg>
//                                             )}
//                                         </div>

//                                         <div className="mt-2.5 sm:mt-3.5">
//                                             <h3 className="line-clamp-1 text-xs font-medium leading-snug text-[#241A15] sm:text-sm">
//                                                 {product.name}
//                                             </h3>
//                                             <p className="mt-0.5 line-clamp-1 text-xs leading-snug text-[#AB9C8C]">
//                                                 {product.desc}
//                                             </p>

//                                             <div className={`mt-1.5 flex items-center sm:mt-2 ${showPricing ? "justify-between" : "justify-end"}`}>
//                                                 {showPricing && (
//                                                     <p className="text-xs font-semibold tabular-nums text-[#7A1F3D] sm:text-sm">
//                                                         ₹{product.price.toLocaleString("en-IN")}
//                                                     </p>
//                                                 )}

//                                                 <a
//                                                     href={getProductWhatsappLink(product)}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     aria-label={`Ask about ${product.name} on WhatsApp`}
//                                                     className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-500 text-white shadow-sm transition duration-200 hover:bg-green-600 hover:shadow-md active:scale-[0.93] sm:h-8 sm:w-8"
//                                                 >
//                                                     <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="currentColor" viewBox="0 0 24 24">
//                                                         <path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 003.85 1h0a7.94 7.94 0 007.94-7.94 7.9 7.9 0 00-2.35-5.62zm-5.55 12.2h0a6.6 6.6 0 01-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.6 6.6 0 01-1-3.5A6.6 6.6 0 0117.6 7.24a6.56 6.56 0 011.94 4.66 6.6 6.6 0 01-6.6 6.62zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64s-.32-.1-.45.1-.5.63-.62.77-.23.15-.43.05a5.4 5.4 0 01-1.6-1 6 6 0 01-1.1-1.37c-.12-.2 0-.3.09-.4s.2-.24.3-.36a1.4 1.4 0 00.2-.34.4.4 0 000-.36c-.05-.1-.45-1.08-.62-1.48s-.33-.33-.45-.33h-.4a.75.75 0 00-.55.26 2.3 2.3 0 00-.72 1.7 4 4 0 00.85 2.1 9.2 9.2 0 003.53 3.1c.5.2.9.33 1.2.42a2.9 2.9 0 001.33.08 2.2 2.2 0 001.43-1 1.8 1.8 0 00.12-1c-.05-.1-.18-.15-.38-.25z" />
//                                                     </svg>
//                                                 </a>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </>
//                     )}
//                 </div>

//                 {/* Contact section — normal, in-flow block at the bottom of the
//                     scrollable area. It only ever appears once the user scrolls
//                     down to it; it cannot cover the product grid. */}
//                 {hasContactContent && (
//                     <div className="border-t border-[#ECE2D2] bg-white">
//                         <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
//                             <p className="mb-5 text-center font-serif text-lg text-[#241A15] sm:text-xl">
//                                 Get in touch
//                             </p>

//                             <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#6B5D4F]">
//                                 {visibleContact.email && (
//                                     <a
//                                         href={`mailto:${visibleContact.email}`}
//                                         className="flex items-center gap-2 hover:text-[#7A1F3D]"
//                                     >
//                                         <FaEnvelope className="h-3.5 w-3.5 text-[#B8873B]" />
//                                         {visibleContact.email}
//                                     </a>
//                                 )}

//                                 {visibleContact.contactNumbers?.map((entry, index) => {
//                                     const Icon = CONTACT_NUMBER_ICON_MAP[entry.type] || FaPhone;
//                                     return (
//                                         <a
//                                             key={`${entry.type}-${index}`}
//                                             href={getContactNumberHref(entry)}
//                                             target={entry.type === "whatsapp" ? "_blank" : undefined}
//                                             rel={entry.type === "whatsapp" ? "noopener noreferrer" : undefined}
//                                             className="flex items-center gap-2 hover:text-[#7A1F3D]"
//                                         >
//                                             <Icon className="h-3.5 w-3.5 text-[#B8873B]" />
//                                             {entry.number}
//                                         </a>
//                                     );
//                                 })}

//                                 {visibleContact.workingHours && (
//                                     <span className="flex items-center gap-2">
//                                         <FaClock className="h-3.5 w-3.5 text-[#B8873B]" />
//                                         {visibleContact.workingHours}
//                                     </span>
//                                 )}

//                                 {visibleContact.googleMapLink && (
//                                     <a
//                                         href={visibleContact.googleMapLink}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         className="flex items-center gap-2 hover:text-[#7A1F3D]"
//                                     >
//                                         <FaMapMarkerAlt className="h-3.5 w-3.5 text-[#B8873B]" />
//                                         Open in Google Maps
//                                     </a>
//                                 )}
//                             </div>

//                             {/* Embedded map */}
//                             {mapEmbedSrc && (
//                                 <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-[#ECE2D2]">
//                                     <iframe
//                                         title="Store location"
//                                         src={mapEmbedSrc}
//                                         width="100%"
//                                         height="280"
//                                         style={{ border: 0 }}
//                                         loading="lazy"
//                                         referrerPolicy="no-referrer-when-downgrade"
//                                         allowFullScreen
//                                         className="block"
//                                     />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* Socials — kept in the footer too for mobile users where the
//                     floating sidebar is hidden (sm:hidden below) */}
//                 {visibleSocialLinks.length > 0 && (
//                     <div className="border-t border-[#ECE2D2] bg-[#FBF7F0]/50 sm:hidden">
//                         <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-4">
//                             {visibleSocialLinks.map((link, index) => {
//                                 const Icon = PLATFORM_ICON_MAP[link.platform];
//                                 if (!Icon) return null;
//                                 return (
//                                     <a
//                                         key={`${link.platform}-mobile-${index}`}
//                                         href={link.url}
//                                         target="_blank"
//                                         rel="noopener noreferrer"
//                                         aria-label={link.platform}
//                                         className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#7A1F3D] shadow-sm ring-1 ring-[#ECE2D2] transition duration-200 hover:-translate-y-0.5 hover:bg-[#7A1F3D] hover:text-white hover:shadow-md"
//                                     >
//                                         <Icon className="h-4 w-4" />
//                                     </a>
//                                 );
//                             })}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default StorePreviewView;

"use client";

import { useMemo, useState } from "react";
import {
    FaInstagram,
    FaFacebook,
    FaYoutube,
    FaTwitter,
    FaLinkedin,
    FaWhatsapp,
    FaTiktok,
    FaPinterest,
    FaEnvelope,
    FaPhone,
    FaClock,
    FaMapMarkerAlt,
} from "react-icons/fa";

const PLATFORM_ICON_MAP = {
    instagram: FaInstagram,
    facebook: FaFacebook,
    youtube: FaYoutube,
    twitter: FaTwitter,
    linkedin: FaLinkedin,
    whatsapp: FaWhatsapp,
    tiktok: FaTiktok,
    pinterest: FaPinterest,
};

const CONTACT_NUMBER_ICON_MAP = {
    phone: FaPhone,
    whatsapp: FaWhatsapp,
};

/**
 * Builds an embeddable Google Maps iframe src.
 * - If the stored link is already an /maps/embed URL, use it as-is.
 * - Otherwise fall back to the public "q=" embed endpoint, preferring the
 *   shop's address (more reliable for embedding) and using the raw link
 *   as a secondary fallback query.
 */
const getMapEmbedSrc = (googleMapLink, address) => {
    if (!googleMapLink && !address) return null;

    if (googleMapLink && googleMapLink.includes("/maps/embed")) {
        return googleMapLink;
    }

    const query = address || googleMapLink;
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
};

const StorePreviewView = ({ shop, categories, products, socials, contact }) => {
    const showPricing = shop?.settings?.products?.showPricing !== false; // default true if unset

    const visibleSocialLinks = socials?.isVisible ? socials?.links ?? [] : [];
    const visibleContact = contact?.isVisible ? contact : null;
    const hasContactContent =
        visibleContact &&
        (visibleContact.email ||
            visibleContact.contactNumbers?.length > 0 ||
            visibleContact.workingHours ||
            visibleContact.googleMapLink);

    const mapEmbedSrc = visibleContact?.googleMapLink
        ? getMapEmbedSrc(visibleContact.googleMapLink, shop?.address)
        : null;

    const categoriesWithProducts = useMemo(() => {
        return categories
            .map((cat) => ({
                ...cat,
                products: products.filter((p) => p.categoryId === cat._id),
            }))
            .filter((cat) => cat.products.length > 0);
    }, [categories, products]);

    const [activeCategoryId, setActiveCategoryId] = useState(
        categoriesWithProducts[0]?._id ?? null
    );

    const activeCategory = categoriesWithProducts.find(
        (cat) => cat._id === activeCategoryId
    );

    const whatsappMessage = encodeURIComponent(
        `Hi, I saw your store "${shop.name.replace(/_/g, " ")}" online and wanted to ask about your products.`
    );

    const getProductWhatsappLink = (product) => {
        const message = encodeURIComponent(
            showPricing
                ? `Hi, I'm interested in "${product.name}" (₹${product.price.toLocaleString("en-IN")}) from ${shop.name.replace(/_/g, " ")}. Iska kya price padega / is this available?`
                : `Hi, I'm interested in "${product.name}" from ${shop.name.replace(/_/g, " ")}. Ye kitne ka hai / what's the price and is it available?`
        );
        return `https://wa.me/91${shop.phone}?text=${message}`;
    };

    const getContactNumberHref = (entry) => {
        return entry.type === "whatsapp"
            ? `https://wa.me/${entry.number.replace(/\D/g, "")}`
            : `tel:${entry.number}`;
    };

    return (
        <div className="flex h-screen flex-col bg-white">
            {/* Floating social icons — fixed to the left edge, vertically centered.
                Dark pill so the icon glyphs read as solid white dots against the page. */}
            {visibleSocialLinks.length > 0 && (
                <div className="fixed left-2 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-2.5 sm:left-3 sm:gap-3 lg:left-5">
                    {visibleSocialLinks.map((link, index) => {
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
            )}

            {/* Floating quick-contact icons — fixed near the bottom-right corner,
                stacked vertically. */}
            {(shop.phone || visibleContact?.contactNumbers?.some((n) => n.type === "phone")) && (
                <div className="fixed bottom-6 right-2 z-40 flex flex-col gap-2.5 sm:bottom-8 sm:right-3 sm:gap-3 lg:right-5 lg:bottom-10">
                    {shop.phone && (
                        <a
                            href={`https://wa.me/91${shop.phone}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Chat on WhatsApp"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#241A15] text-white shadow-md ring-1 ring-black/10 transition duration-200 hover:translate-x-0.5 hover:bg-green-600 hover:shadow-lg"
                        >
                            <FaWhatsapp className="h-4 w-4" />
                        </a>
                    )}
                    {shop.phone && (
                        <a
                            href={`tel:${shop.phone}`}
                            aria-label="Call the store"
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#241A15] text-white shadow-md ring-1 ring-black/10 transition duration-200 hover:translate-x-0.5 hover:bg-[#7A1F3D] hover:shadow-lg"
                        >
                            <FaPhone className="h-4 w-4" />
                        </a>
                    )}
                </div>
            )}

            {/* Header — logo left, name centered, WhatsApp on the right */}
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
                </div>

                <div className="h-[3px] w-full bg-gradient-to-r from-[#B8873B] via-[#7A1F3D] to-[#B8873B]" />
            </div>

            {/* Category tabs */}
            {categoriesWithProducts.length > 0 && (
                <div className="mx-auto w-full max-w-6xl shrink-0 border-b border-[#ECE2D2] bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
                    <div className="flex gap-2 overflow-x-auto sm:gap-2.5">
                        {categoriesWithProducts.map((cat) => {
                            const isActive = cat._id === activeCategoryId;
                            return (
                                <button
                                    key={cat._id}
                                    onClick={() => setActiveCategoryId(cat._id)}
                                    className={`shrink-0 whitespace-nowrap border-b-2 px-1 pb-2 pt-1 text-base font-semibold tracking-tight transition-colors duration-150 sm:px-1.5 sm:text-lg ${isActive
                                        ? "border-[#7A1F3D] text-[#241A15]"
                                        : "border-transparent text-[#948676] hover:border-[#B8873B] hover:text-[#241A15]"
                                        }`}
                                >
                                    {cat.name}
                                    <span
                                        className={`ml-1.5 text-xs font-medium tabular-nums ${isActive ? "text-[#B8873B]" : "text-[#C9B79A]"
                                            }`}
                                    >
                                        {cat.products.length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Scrollable body — products, then contact, then socials footer.
                This is the ONLY element that scrolls; nothing here is fixed/sticky,
                so the contact block can never sit on top of / block the products. */}
            <div className="flex-1 overflow-y-auto bg-white">
                <div className="mx-auto max-w-6xl px-4 py-7 sm:px-6 sm:py-10 lg:px-8">
                    {categoriesWithProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#ECE2D2] bg-[#FBF7F0]/50 py-24 text-center">
                            <svg
                                className="h-8 w-8 text-[#C9B79A]"
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
                            <p className="mt-3 text-sm font-medium text-[#6B5D4F]">
                                No products yet
                            </p>
                            <p className="mt-1 text-xs text-[#948676]">
                                Items will show up here as soon as they&apos;re added.
                            </p>
                        </div>
                    ) : (
                        <>
                            {activeCategory?.description && (
                                <p className="mb-7 max-w-lg text-sm leading-relaxed text-[#948676]">
                                    {activeCategory.description}
                                </p>
                            )}

                            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-7 sm:gap-x-6 sm:gap-y-9">
                                {activeCategory?.products.map((product) => (
                                    <div key={product._id} className="group">
                                        <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#F3EAD9] shadow-[0_1px_2px_rgba(36,26,21,0.06)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_24px_-8px_rgba(122,31,61,0.25)]">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
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
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Contact section — normal, in-flow block at the bottom of the
                    scrollable area. It only ever appears once the user scrolls
                    down to it; it cannot cover the product grid. */}
                {hasContactContent && (
                    <div className="border-t border-[#ECE2D2] bg-white">
                        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                            <p className="mb-5 text-center font-serif text-lg text-[#241A15] sm:text-xl">
                                Get in touch
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-[#6B5D4F]">
                                {visibleContact.email && (
                                    <a
                                        href={`mailto:${visibleContact.email}`}
                                        className="flex items-center gap-2 hover:text-[#7A1F3D]"
                                    >
                                        <FaEnvelope className="h-3.5 w-3.5 text-[#B8873B]" />
                                        {visibleContact.email}
                                    </a>
                                )}

                                {visibleContact.contactNumbers?.map((entry, index) => {
                                    const Icon = CONTACT_NUMBER_ICON_MAP[entry.type] || FaPhone;
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

                                {visibleContact.workingHours && (
                                    <span className="flex items-center gap-2">
                                        <FaClock className="h-3.5 w-3.5 text-[#B8873B]" />
                                        {visibleContact.workingHours}
                                    </span>
                                )}

                                {visibleContact.googleMapLink && (
                                    <a
                                        href={visibleContact.googleMapLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 hover:text-[#7A1F3D]"
                                    >
                                        <FaMapMarkerAlt className="h-3.5 w-3.5 text-[#B8873B]" />
                                        Open in Google Maps
                                    </a>
                                )}
                            </div>

                            {/* Embedded map */}
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
                )}

            </div>
        </div>
    );
};

export default StorePreviewView;