  import { PERMISSION_GROUPS } from "@/config/permissions";

  export default function PermissionsSelector({ selected, onChange }) {
    const togglePermission = (key) => {
      if (selected.includes(key)) {
        onChange(selected.filter((p) => p !== key));
      } else {
        onChange([...selected, key]);
      }
    };

    return (
      <div className="flex flex-col gap-4">
        {PERMISSION_GROUPS.map((group) => (
          <div key={group.resource}>
            <p className="text-sm text-gray-600 mb-2">{group.resource}</p>
            <div className="flex flex-wrap gap-4">
              {group.permissions.map((perm) => (
                <label key={perm.key} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selected.includes(perm.key)}
                    onChange={() => togglePermission(perm.key)}
                  />
                  {perm.label}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }