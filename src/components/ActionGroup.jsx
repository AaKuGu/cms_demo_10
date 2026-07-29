import { Pencil, Trash2 } from "lucide-react";

export default function ActionGroup({
  onDelete,
  onEdit,
  isDeleting = false,
  className = "",
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      <button
        type="button"
        onClick={onEdit}
        className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-700"
        title="Edit"
      >
        <Pencil size={16} />
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting}
        className="p-1.5 rounded-md text-red-600 hover:bg-red-50 hover:text-red-700 disabled:opacity-40 disabled:cursor-not-allowed"
        title="Delete"
      >
        {isDeleting ? <span className="text-xs">...</span> : <Trash2 size={16} />}
      </button>
    </div>
  );
}
