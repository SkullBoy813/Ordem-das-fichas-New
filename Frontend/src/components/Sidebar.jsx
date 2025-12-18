import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Sidebar() {
	const { isAuthenticated } = useAuthStore();

	if (!isAuthenticated) return null;

	return (
		<aside className="w-64 bg-zinc-900 border-r border-red-900/30 p-4 hidden md:block">
			<nav className="space-y-3">
				<Link to="/fichas" className="block text-white hover:text-red-600 transition">
					Fichas
				</Link>
				<Link to="/dashboard" className="block text-white hover:text-red-600 transition">
					Dashboard
				</Link>
			</nav>
		</aside>
	);
}
