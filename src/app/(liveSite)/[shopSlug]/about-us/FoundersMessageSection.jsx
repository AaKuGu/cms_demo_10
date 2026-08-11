// src/components/liveSite/about/sections/FoundersMessageSection.jsx
const FoundersMessageSection = ({ data }) => {
    if (!data.message) return null;

    return (
        <section className="mx-auto max-w-3xl">
            <div className="rounded-2xl bg-gradient-to-b from-[#FBF7F0] to-white p-6 text-center sm:p-10">
                <svg className="mx-auto h-8 w-8 text-[#B8873B]/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9.5 6C6.5 7.5 5 10 5 13c0 2.5 1.7 4 3.7 4 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.2-3-3.2-.3 0-.6 0-.8.1.4-1.6 1.7-3 3.3-3.7L9.5 6zm9 0C15.5 7.5 14 10 14 13c0 2.5 1.7 4 3.7 4 1.9 0 3.3-1.4 3.3-3.3 0-1.8-1.3-3.2-3-3.2-.3 0-.6 0-.8.1.4-1.6 1.7-3 3.3-3.7L18.5 6z" />
                </svg>

                <p className="mt-4 whitespace-pre-line font-serif text-lg leading-relaxed text-[#241A15] sm:text-xl">
                    {data.message}
                </p>

                <div className="mt-6 flex flex-col items-center gap-3">
                    {data.photo && (
                        <img
                            src={data.photo}
                            alt={data.founderName}
                            className="h-14 w-14 rounded-full object-cover ring-2 ring-[#B8873B]/40 ring-offset-2"
                        />
                    )}
                    {data.signatureImage && (
                        <img src={data.signatureImage} alt="" className="h-10 object-contain" />
                    )}
                    <div>
                        <p className="text-sm font-medium text-[#241A15]">{data.founderName}</p>
                        {data.designation && (
                            <p className="text-xs uppercase tracking-[0.08em] text-[#948676]">
                                {data.designation}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoundersMessageSection;