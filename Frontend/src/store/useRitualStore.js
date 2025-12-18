import { create } from "zustand";
import { api } from "../services/api";

export const useRitualStore = create((set) => ({
  rituais: [],
  loading: false,
  error: null,

  listarRituais: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/rituais");
      set({ rituais: res.data, loading: false });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.erro || "Erro ao carregar rituais",
        loading: false,
      });
      return [];
    }
  },
}));

