// export default function FormInput({ label, hint, id, className = "", ...props }) {
//   const inputId = id || props.name;

//   return (
//     <div className="flex flex-col gap-1.5">
//       {label && (
//         <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
//           {label}
//         </label>
//       )}
//       <input
//         id={inputId}
//         className={`w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 ${className}`}
//         {...props}
//       />
//       {hint && <p className="text-xs text-slate-400">{hint}</p>}
//     </div>
//   );
// }

export default function FormInput({ label, hint, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-700">{label}</label>
      )}
      <input
        className={`w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 ${className}`}
        {...props}
      />
      {hint && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  );
}