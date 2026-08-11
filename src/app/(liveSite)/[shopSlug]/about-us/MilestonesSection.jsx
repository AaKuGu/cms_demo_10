// src/components/liveSite/about/sections/MilestonesSection.jsx
const MilestonesSection = ({ data }) => {
    const stats = [...(data.stats || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    if (stats.length === 0) return null;

    return (
        <section>
            <div
                className={`grid grid-cols-2 gap-6 sm:gap-8 ${stats.length >= 4 ? "sm:grid-cols-4" : `sm:grid-cols-${stats.length}`
                    }`}
            >
                {stats.map((stat) => (
                    <div key={stat._id} className="text-center">
                        <p className="font-serif text-3xl text-[#7A1F3D] sm:text-4xl">{stat.value}</p>
                        <p className="mt-1.5 text-xs uppercase tracking-[0.08em] text-[#948676] sm:text-sm">
                            {stat.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MilestonesSection;