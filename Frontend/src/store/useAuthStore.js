import { create } from "zustand";
import { api } from "../services/api";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  // Check if user is authenticated on mount
  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return false;
    }

    try {
      // You might want to add a /me endpoint to verify token
      // For now, we'll just check if token exists
      set({ isAuthenticated: true });
      return true;
    } catch {
      localStorage.removeItem("token");
      set({ isAuthenticated: false, user: null });
      return false;
    }
  },

  login: async (email, senha) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/api/auth/login", { email, password: senha });

      localStorage.setItem("token", res.data.token);
      set({ 
        user: res.data.user, 
        loading: false, 
        isAuthenticated: true 
      });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.error || err.response?.data?.message || "Erro ao logar",
        loading: false,
      });
      return false;
    }
  },

  register: async (dados) => {
    set({ loading: true, error: null });
    try {
      await api.post("/api/auth/register", {
        username: dados.nome,
        email: dados.email,
        password: dados.senha,
      });
      set({ loading: false });
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.error || err.response?.data?.message || "Erro ao registrar",
        loading: false,
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },
}));
