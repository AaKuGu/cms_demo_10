import Link from "next/link";

// Picks a column count that keeps rows balanced instead of vacant.
// 6 categories -> 3/row (2 full rows), 10 -> 4/row, 4 -> 2/row, etc.
const getColumnCount = (count, maxCols = 4, minCols = 2) => {
    if (count <= minCols) return Math.max(count, 1);
    const ideal = Math.ceil(Math.sqrt(count));
    return Math.min(maxCols, Math.max(minCols, ideal));
};

const GRID_CLASSES = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
};

const CategoryCards = ({ shopSlug, categories }) => {
    if (categories.length === 0) return null;

    const cols = getColumnCount(categories.length);

    return (
        <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className={`grid gap-3 sm:gap-5 ${GRID_CLASSES[cols]}`}>
                {categories.map((cat) => (
                    <Link
                        key={cat._id}
                        // href={`/${shopSlug}/${cat.slug}`}
                        href={`/${cat.slug}`}
                        className="group overflow-hidden rounded-xl border border-[#ECE2D2] bg-white transition duration-200 hover:shadow-md"
                    >
                        <div className="relative aspect-square w-full bg-[#F4EDE1]">
                            {cat.image ? (
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-xs text-[#C9B79A]">
                                    No image
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 transition duration-200 group-hover:bg-black/20" />

                            {/* Centered "Browse Collection" pill — hidden until hover */}
                            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition duration-200 group-hover:opacity-100">
                                <span className="rounded-full bg-white px-4 py-2 text-xs font-medium italic text-black shadow-sm sm:text-sm">
                                    Browse Collection
                                </span>
                            </div>
                        </div>
                        <div className="px-3 py-3">
                            <p className="truncate text-base font-semibold text-[#241A15]">
                                {cat.name}
                            </p>
                            <p className="text-sm font-medium text-[#B8873B]">
                                {cat.products.length} items
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryCards;