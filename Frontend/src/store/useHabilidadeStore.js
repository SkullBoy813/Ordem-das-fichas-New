import { create } from "zustand";
import { api } from "../services/api";

export const useHabilidadeStore = create((set) => ({
  habilidades: [],
  loading: false,
  error: null,

  listarHabilidades: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/habilidades");
      set({ habilidades: res.data, loading: false });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.erro || "Erro ao carregar habilidades",
        loading: false,
      });
      return [];
    }
  },

  criarHabilidade: async (dados) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/api/habilidades", dados);
      set((state) => ({
        habilidades: [...state.habilidades, res.data],
        loading: false,
      }));
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.erro || "Erro ao criar habilidade",
        loading: false,
      });
      return null;
    }
  },
}));

