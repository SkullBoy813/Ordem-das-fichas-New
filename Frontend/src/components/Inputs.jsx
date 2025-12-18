export default function Input({ label, type = "text", className = "", error, ...props }) {
  const base = "bg-zinc-900 border border-zinc-700 rounded px-3 py-2 text-white focus:outline-none focus:border-red-600";
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm text-gray-300">{label}</label>}
      <input
        type={type}
        className={`${base} ${className}`.trim()}
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}