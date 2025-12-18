import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import FichasList from "./pages/Fichas/FichasList";
import FichaDetail from "./pages/Fichas/FichaDetail";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fichas"
          element={
            <ProtectedRoute>
              <FichasList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fichas/nova"
          element={
            <ProtectedRoute>
              <FichaDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fichas/:id"
          element={
            <ProtectedRoute>
              <FichaDetail />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
