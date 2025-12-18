import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const init = async () => {
      await checkAuth();
      setChecking(false);
    };
    init();
  }, [checkAuth]);

  if (checking) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="text-red-600">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

