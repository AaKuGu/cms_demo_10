export default function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  href,
  actionClassName = "",
}) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 p-12 text-center">
      <p className="mb-1 font-medium text-gray-900">{title}</p>
      {description && <p className="mb-5 text-sm text-gray-500">{description}</p>}

      {actionLabel && (
        <a
          href={href}
          onClick={onAction}
          className={`rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 ${actionClassName}`.trim()}
        >
          {actionLabel}
        </a>
      )}
    </div>
  );
}
