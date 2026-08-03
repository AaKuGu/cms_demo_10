import Link from "next/link";

export default function PageHeader({ title, description, rightButton, actionClassName = "" }) {
  const baseClassName = "rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 whitespace-nowrap";

  return (
    <div className="mb-8">
      <div className="mb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 sm:text-2xl">{title}</h1>
        {rightButton?.href && rightButton?.label ? (
          <Link
            href={rightButton.href}
            className={`${baseClassName} ${actionClassName}`.trim()}
          >
            {rightButton.label}
          </Link>
        ) : null}
      </div>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}