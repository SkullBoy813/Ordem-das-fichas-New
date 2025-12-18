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
        <Link to={isAuthenticated ? "/fichas" : "/"} className="flex items-center gap-4">
          <img src="/logo.svg" alt="Ordem das Fichas" className="w-12 h-12 md:w-14 md:h-14" />
          <span className="hidden sm:inline text-red-600 font-bold text-lg md:text-xl">ORDEM</span>
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
        {!isAuthPage && (
          <Link to="/" className="text-white hover:text-red-600 transition text-sm">
            Início
          </Link>
        )}
      </div>
    </header>
  );
}
