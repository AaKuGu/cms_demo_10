const EmptyProductsState = () => {
    return (
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
            <p className="mt-3 text-sm font-medium text-[#6B5D4F]">No products yet</p>
            <p className="mt-1 text-xs text-[#948676]">
                Items will show up here as soon as they&apos;re added.
            </p>
        </div>
    );
};

export default EmptyProductsState;