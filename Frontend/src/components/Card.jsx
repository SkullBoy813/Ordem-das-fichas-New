export default function Card({ children, className = "" }) {
  const base = "bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-full max-w-md";
  return (
    <div className={`${base} ${className}`.trim()}>
      {children}
    </div>
  );
}