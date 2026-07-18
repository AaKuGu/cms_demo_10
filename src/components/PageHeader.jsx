export default function PageHeader({ title, description, action }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        {action}
      </div>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
}