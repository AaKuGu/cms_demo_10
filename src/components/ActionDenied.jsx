export default function ActionDenied({ message }) {
  return (
    <div className="text-center py-16">
      <p className="text-gray-900 font-medium mb-1">Access denied</p>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}
