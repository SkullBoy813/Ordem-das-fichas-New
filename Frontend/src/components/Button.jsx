export default function Button({ children, className = "", ...props }) {
  const base = "bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded text-white font-semibold";
  return (
    <button
      {...props}
      className={`${base} ${className}`.trim()}
    >
      {children}
    </button>
  );
}