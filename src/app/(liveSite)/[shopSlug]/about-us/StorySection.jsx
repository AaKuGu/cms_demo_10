// src/components/liveSite/about/sections/StorySection.jsx
const StorySection = ({ data }) => {
    if (!data.content && !data.coverImage) return null;

    return (
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14 lg:items-center">
            {data.coverImage && (
                <div className="order-1 lg:order-none">
                    <img
                        src={data.coverImage}
                        alt={data.heading || "Our story"}
                        className="w-full rounded-2xl object-cover ring-1 ring-[#B8873B]/15 aspect-[4/3]"
                    />
                </div>
            )}
            <div className={data.coverImage ? "" : "mx-auto max-w-2xl text-center"}>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#B8873B]">
                    {data.establishedYear ? `Since ${data.establishedYear}` : "Our story"}
                </p>
                <h2 className="mt-2 font-serif text-2xl text-[#241A15] sm:text-3xl">
                    {data.heading || "Our Story"}
                </h2>
                {data.content && (
                    <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#5C4A3A] sm:text-base">
                        {data.content}
                    </p>
                )}
            </div>
        </section>
    );
};

export default StorySection;