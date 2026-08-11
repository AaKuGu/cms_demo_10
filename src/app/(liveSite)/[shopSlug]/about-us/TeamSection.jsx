// src/components/liveSite/about/sections/TeamSection.jsx
const TeamSection = ({ data }) => {
    const members = (data.members || [])
        .filter((m) => m.isVisible !== false)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

    if (members.length === 0) return null;

    return (
        <section>
            <h2 className="text-center font-serif text-2xl text-[#241A15] sm:text-3xl">
                {data.heading || "Meet Our Team"}
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:mt-10 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
                {members.map((member) => (
                    <div key={member._id} className="text-center">
                        {member.photo ? (
                            <img
                                src={member.photo}
                                alt={member.name}
                                className="mx-auto h-20 w-20 rounded-full object-cover ring-2 ring-[#B8873B]/30 ring-offset-2 sm:h-24 sm:w-24"
                            />
                        ) : (
                            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#7A1F3D] to-[#5E1730] text-lg font-medium text-white ring-2 ring-[#B8873B]/30 ring-offset-2 sm:h-24 sm:w-24">
                                {member.name.charAt(0)}
                            </div>
                        )}

                        <p className="mt-3 text-sm font-medium text-[#241A15]">{member.name}</p>
                        {member.designation && (
                            <p className="text-xs text-[#948676]">{member.designation}</p>
                        )}

                        {(member.socialLinks?.instagram || member.socialLinks?.linkedin) && (
                            <div className="mt-2 flex items-center justify-center gap-2.5">
                                {member.socialLinks.instagram && (
                                    <a
                                        href={member.socialLinks.instagram}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#B8873B] hover:text-[#7A1F3D]"
                                        aria-label={`${member.name} on Instagram`}
                                    >
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.4.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.35 1.05.4 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.4 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.35-2.22.4-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.4-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.35-1.05-.4-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.8.4-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.35 2.22-.4 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.66.66 1.33 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.66 1.07-1.33 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.27.07-1.68.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 105.84 12 6.16 6.16 0 0012 5.84zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z" />
                                        </svg>
                                    </a>
                                )}
                                {member.socialLinks.linkedin && (
                                    <a
                                        href={member.socialLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#B8873B] hover:text-[#7A1F3D]"
                                        aria-label={`${member.name} on LinkedIn`}
                                    >
                                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 11.01-4.13 2.07 2.07 0 01-.01 4.13zM7.11 20.45H3.56V9h3.55v11.45z" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;