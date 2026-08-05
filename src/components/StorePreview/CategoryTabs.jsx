"use client";

const CategoryTabs = ({ categories, activeCategoryId, onSelect }) => {
    if (categories.length === 0) return null;

    return (
        <div className="mx-auto w-full max-w-6xl shrink-0 border-b border-[#ECE2D2] bg-white px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
            <div className="flex gap-2 overflow-x-auto sm:gap-2.5">
                {categories.map((cat) => {
                    const isActive = cat._id === activeCategoryId;
                    return (
                        <button
                            key={cat._id}
                            onClick={() => onSelect(cat._id)}
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
    );
};

export default CategoryTabs;