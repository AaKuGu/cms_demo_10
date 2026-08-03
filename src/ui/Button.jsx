// components/ui/Button.jsx
import Link from "next/link";

const variants = {
    primary: "bg-primary hover:bg-primary-hover text-white",
    outline: "border border-border text-black hover:bg-black hover:text-white",
    ghost: "text-text-muted hover:bg-surface",
};

const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
};

export default function Button({
    href,
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    children,
    ...props
}) {
    const classes = [
        "inline-flex items-center justify-center gap-2 rounded-lg text-[9px] md:text-[13px] transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "",
        className,
    ].filter(Boolean).join(" ");

    if (href) {
        return (
            <Link href={href} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}