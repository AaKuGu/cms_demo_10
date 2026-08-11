// "use client";

// import { useState } from "react";

// const ContactPage = ({ shop, contact }) => {
//     const [form, setForm] = useState({ name: "", email: "", message: "" });
//     const [status, setStatus] = useState("idle"); // idle | sending | sent | error

//     const handleChange = (e) => {
//         setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setStatus("sending");
//         try {
//             // TODO: wire to your API route, e.g. POST /api/shops/[shopSlug]/contact-submissions
//             await new Promise((res) => setTimeout(res, 800));
//             setStatus("sent");
//             setForm({ name: "", email: "", message: "" });
//         } catch (err) {
//             setStatus("error");
//         }
//     };

//     const phoneEntry = contact?.contactNumbers?.find((c) => c.type === "phone");
//     const whatsappEntry = contact?.contactNumbers?.find((c) => c.type === "whatsapp");

//     return (
//         <div className="bg-white">
//             <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
//                 <div className="mb-10 text-center sm:mb-14">
//                     <h1 className="font-serif text-3xl tracking-tight text-[#241A15] sm:text-4xl">
//                         Get in Touch
//                     </h1>
//                     <p className="mx-auto mt-3 max-w-xl text-sm text-[#948676] sm:text-base">
//                         Have a question about a piece, an order, or a custom request? We&apos;d love to hear from you.
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
//                     {/* Left: Info block */}
//                     <div className="lg:col-span-2">
//                         <div className="rounded-2xl border border-[#B8873B]/20 bg-[#FBF7F0] p-6 sm:p-8">
//                             <h2 className="font-serif text-lg text-[#241A15] sm:text-xl">
//                                 {shop.name.replace(/_/g, " ")}
//                             </h2>

//                             <div className="mt-6 space-y-5">
//                                 {contact?.address && (
//                                     <InfoRow icon="pin" label="Visit us">
//                                         {contact.address}
//                                     </InfoRow>
//                                 )}

//                                 {phoneEntry && (
//                                     <InfoRow icon="phone" label="Call us">
//                                         <a href={`tel:${phoneEntry.number}`} className="hover:text-[#7A1F3D]">
//                                             {phoneEntry.number}
//                                         </a>
//                                     </InfoRow>
//                                 )}

//                                 {whatsappEntry && (
//                                     <InfoRow icon="whatsapp" label="WhatsApp">
//                                         <a
//                                             href={`https://wa.me/91${whatsappEntry.number}`}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             className="hover:text-[#7A1F3D]"
//                                         >
//                                             {whatsappEntry.number}
//                                         </a>
//                                     </InfoRow>
//                                 )}

//                                 {contact?.email && (
//                                     <InfoRow icon="mail" label="Email us">
//                                         <a href={`mailto:${contact.email}`} className="hover:text-[#7A1F3D]">
//                                             {contact.email}
//                                         </a>
//                                     </InfoRow>
//                                 )}

//                                 {contact?.workingHours && (
//                                     <InfoRow icon="clock" label="Working hours">
//                                         {contact.workingHours}
//                                     </InfoRow>
//                                 )}
//                             </div>

//                             {contact?.googleMapLink && (
//                                 <a
//                                     href={contact.googleMapLink}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="mt-7 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-[#7A1F3D] hover:text-[#5E1730]"
//                                 >
//                                     Get directions
//                                     <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                                         <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                                     </svg>
//                                 </a>
//                             )}
//                         </div>
//                     </div>

//                     {/* Right: Contact form */}
//                     <div className="lg:col-span-3">
//                         <form onSubmit={handleSubmit} className="space-y-5">
//                             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//                                 <Field
//                                     label="Your name"
//                                     name="name"
//                                     value={form.name}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                                 <Field
//                                     label="Email address"
//                                     name="email"
//                                     type="email"
//                                     value={form.email}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>

//                             <div>
//                                 <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#5C4A3A]">
//                                     Message
//                                 </label>
//                                 <textarea
//                                     name="message"
//                                     rows={5}
//                                     required
//                                     value={form.message}
//                                     onChange={handleChange}
//                                     placeholder="Tell us what you're looking for..."
//                                     className="w-full rounded-lg border border-[#B8873B]/30 bg-white px-3.5 py-2.5 text-sm text-[#241A15] outline-none transition focus:border-[#7A1F3D] focus:ring-2 focus:ring-[#7A1F3D]/15"
//                                 />
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={status === "sending"}
//                                 className="inline-flex items-center justify-center rounded-full bg-[#7A1F3D] px-7 py-3 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-[#5E1730] hover:shadow-md active:scale-[0.98] disabled:opacity-60"
//                             >
//                                 {status === "sending" ? "Sending..." : "Send message"}
//                             </button>

//                             {status === "sent" && (
//                                 <p className="text-sm text-green-700">
//                                     Thanks — we&apos;ve received your message and will get back to you soon.
//                                 </p>
//                             )}
//                             {status === "error" && (
//                                 <p className="text-sm text-red-600">
//                                     Something went wrong. Please try again or reach us on WhatsApp.
//                                 </p>
//                             )}
//                         </form>
//                     </div>
//                 </div>
//             </div >
//         </div >
//     );
// };

// const Field = ({ label, name, type = "text", value, onChange, required }) => (
//     <div>
//         <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#5C4A3A]">
//             {label}
//         </label>
//         <input
//             type={type}
//             name={name}
//             value={value}
//             onChange={onChange}
//             required={required}
//             className="w-full rounded-lg border border-[#B8873B]/30 bg-white px-3.5 py-2.5 text-sm text-[#241A15] outline-none transition focus:border-[#7A1F3D] focus:ring-2 focus:ring-[#7A1F3D]/15"
//         />
//     </div>
// );

// const ICONS = {
//     pin: (
//         <>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
//             <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
//         </>
//     ),
//     phone: (
//         <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
//         />
//     ),
//     whatsapp: (
//         <path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 003.85 1h0a7.94 7.94 0 007.94-7.94 7.9 7.9 0 00-2.35-5.62z" />
//     ),
//     mail: (
//         <>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75" />
//             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75l9.75 6.75 9.75-6.75M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25" />
//         </>
//     ),
//     clock: (
//         <>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
//             <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
//         </>
//     ),
// };

// const InfoRow = ({ icon, label, children }) => (
//     <div className="flex items-start gap-3">
//         <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#B8873B] ring-1 ring-[#B8873B]/25">
//             <svg className="h-4 w-4" fill={icon === "whatsapp" ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
//                 {ICONS[icon]}
//             </svg>
//         </span>
//         <div className="min-w-0">
//             <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#948676]">{label}</p>
//             <p className="text-sm text-[#241A15]">{children}</p>
//         </div>
//     </div>
// );

// export default ContactPage;


// src/components/liveSite/contact/ContactPage.jsx
"use client";

import { useState } from "react";

const ContactPage = ({ shop, contact }) => {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const phoneEntry = contact?.contactNumbers?.find((c) => c.type === "phone");
    const whatsappEntry = contact?.contactNumbers?.find((c) => c.type === "whatsapp");
    const targetNumber = whatsappEntry?.number || phoneEntry?.number || shop.phone;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!targetNumber) return; // no number configured — button is disabled below anyway

        const lines = [
            `Hi, I'm ${form.name}.`,
            form.email ? `Email: ${form.email}` : null,
            "",
            form.message,
        ].filter(Boolean);

        const text = encodeURIComponent(lines.join("\n"));
        const url = `https://wa.me/91${targetNumber}?text=${text}`;

        window.open(url, "_blank", "noopener,noreferrer");
    };

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                <div className="mb-10 text-center sm:mb-14">
                    <h1 className="font-serif text-3xl tracking-tight text-[#241A15] sm:text-4xl">
                        Get in Touch
                    </h1>
                    <p className="mx-auto mt-3 max-w-xl text-sm text-[#948676] sm:text-base">
                        Have a question about a piece, an order, or a custom request? We&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
                    {/* Left: Info block */}
                    <div className="lg:col-span-2">
                        <div className="rounded-2xl border border-[#B8873B]/20 bg-[#FBF7F0] p-6 sm:p-8">
                            <h2 className="font-serif text-lg text-[#241A15] sm:text-xl">
                                {shop.name.replace(/_/g, " ")}
                            </h2>

                            <div className="mt-6 space-y-5">
                                {contact?.address && (
                                    <InfoRow icon="pin" label="Visit us">
                                        {contact.address}
                                    </InfoRow>
                                )}

                                {phoneEntry && (
                                    <InfoRow icon="phone" label="Call us">
                                        <a href={`tel:${phoneEntry.number}`} className="hover:text-[#7A1F3D]">
                                            {phoneEntry.number}
                                        </a>
                                    </InfoRow>
                                )}

                                {whatsappEntry && (
                                    <InfoRow icon="whatsapp" label="WhatsApp">
                                        <a
                                            href={`https://wa.me/91${whatsappEntry.number}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-[#7A1F3D]"
                                        >
                                            {whatsappEntry.number}
                                        </a>
                                    </InfoRow>
                                )}

                                {contact?.email && (
                                    <InfoRow icon="mail" label="Email us">
                                        <a href={`mailto:${contact.email}`} className="hover:text-[#7A1F3D]">
                                            {contact.email}
                                        </a>
                                    </InfoRow>
                                )}

                                {contact?.workingHours && (
                                    <InfoRow icon="clock" label="Working hours">
                                        {contact.workingHours}
                                    </InfoRow>
                                )}
                            </div>

                            {contact?.googleMapLink && (
                                <a
                                    href={contact.googleMapLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-7 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] text-[#7A1F3D] hover:text-[#5E1730]"
                                >
                                    Get directions
                                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Right: Contact form -> opens WhatsApp with prefilled message */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                <Field
                                    label="Your name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                                <Field
                                    label="Email address (optional)"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#5C4A3A]">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    required
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us what you're looking for..."
                                    className="w-full rounded-lg border border-[#B8873B]/30 bg-white px-3.5 py-2.5 text-sm text-[#241A15] outline-none transition focus:border-[#7A1F3D] focus:ring-2 focus:ring-[#7A1F3D]/15"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!targetNumber}
                                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-7 py-3 text-sm font-medium text-white shadow-sm transition duration-200 hover:bg-green-600 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 003.85 1h0a7.94 7.94 0 007.94-7.94 7.9 7.9 0 00-2.35-5.62zm-5.55 12.2h0a6.6 6.6 0 01-3.36-.92l-.24-.14-2.5.65.67-2.44-.16-.25a6.6 6.6 0 01-1-3.5A6.6 6.6 0 0117.6 7.24a6.56 6.56 0 011.94 4.66 6.6 6.6 0 01-6.6 6.62zm3.6-4.94c-.2-.1-1.17-.58-1.35-.64s-.32-.1-.45.1-.5.63-.62.77-.23.15-.43.05a5.4 5.4 0 01-1.6-1 6 6 0 01-1.1-1.37c-.12-.2 0-.3.09-.4s.2-.24.3-.36a1.4 1.4 0 00.2-.34.4.4 0 000-.36c-.05-.1-.45-1.08-.62-1.48s-.33-.33-.45-.33h-.4a.75.75 0 00-.55.26 2.3 2.3 0 00-.72 1.7 4 4 0 00.85 2.1 9.2 9.2 0 003.53 3.1c.5.2.9.33 1.2.42a2.9 2.9 0 001.33.08 2.2 2.2 0 001.43-1 1.8 1.8 0 00.12-1c-.05-.1-.18-.15-.38-.25z" />
                                </svg>
                                Send on WhatsApp
                            </button>

                            {!targetNumber && (
                                <p className="text-sm text-red-600">
                                    This shop hasn&apos;t added a contact number yet.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div >
        </div >
    );
};

const Field = ({ label, name, type = "text", value, onChange, required }) => (
    <div>
        <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.08em] text-[#5C4A3A]">
            {label}
        </label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full rounded-lg border border-[#B8873B]/30 bg-white px-3.5 py-2.5 text-sm text-[#241A15] outline-none transition focus:border-[#7A1F3D] focus:ring-2 focus:ring-[#7A1F3D]/15"
        />
    </div>
);

const ICONS = {
    pin: (
        <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </>
    ),
    phone: (
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 00-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97a1.125 1.125 0 00.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
        />
    ),
    whatsapp: (
        <path d="M17.6 6.32A7.85 7.85 0 0012.05 4a7.94 7.94 0 00-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 003.85 1h0a7.94 7.94 0 007.94-7.94 7.9 7.9 0 00-2.35-5.62z" />
    ),
    mail: (
        <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75l9.75 6.75 9.75-6.75M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25" />
        </>
    ),
    clock: (
        <>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            <circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round" />
        </>
    ),
};

const InfoRow = ({ icon, label, children }) => (
    <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#B8873B] ring-1 ring-[#B8873B]/25">
            <svg className="h-4 w-4" fill={icon === "whatsapp" ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                {ICONS[icon]}
            </svg>
        </span>
        <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#948676]">{label}</p>
            <p className="text-sm text-[#241A15]">{children}</p>
        </div>
    </div>
);

export default ContactPage;