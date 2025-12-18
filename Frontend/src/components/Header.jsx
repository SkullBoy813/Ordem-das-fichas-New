import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, isAuthenticated } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isAuthPage = location.pathname === "/";

  return (
    <header className="w-full flex justify-between items-center px-6 md:px-10 py-4 bg-black/90 border-b border-red-900/30">
      <div className="flex items-center gap-3">
        <Link to={isAuthenticated ? "/fichas" : "/"}>
          <div className="w-8 h-8 rounded-full bg-red-600 shadow-lg shadow-red-600/50 cursor-pointer hover:bg-red-700 transition"></div>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {isAuthenticated && !isAuthPage && (
          <>
            <Link
              to="/fichas"
              className="text-white hover:text-red-600 transition text-sm"
            >
              Fichas
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-600 transition text-sm"
            >
              Sair
            </button>
          </>
        )}
        <div className="text-white font-semibold text-lg tracking-wide">
          MENU
        </div>
      </div>
    </header>
  );
}
