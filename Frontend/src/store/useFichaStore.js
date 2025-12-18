import { create } from "zustand";
import { api } from "../services/api";

export const useFichaStore = create((set) => ({
  fichas: [],
  fichaAtual: null,
  loading: false,
  error: null,

  listarFichas: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/fichas");
      set({ fichas: res.data, loading: false });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Erro ao carregar fichas",
        loading: false,
      });
      return [];
    }
  },

  buscarFicha: async (id) => {
    // Defensive: avoid calling API with invalid id (eg. 'undefined' or empty)
    if (!id || id === "undefined") {
      set({ loading: false, error: "ID inválido" });
      return null;
    }
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/api/fichas/${id}`);
      set({ fichaAtual: res.data, loading: false });
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Erro ao carregar ficha",
        loading: false,
      });
      return null;
    }
  },

  limparFichaAtual: () => {
    set({ fichaAtual: null });
  },

  criarFicha: async (dados) => {
    set({ loading: true, error: null });
    try {
      console.log('Enviando dados para criar ficha:', dados);
      const res = await api.post("/api/fichas", dados);
      console.log('Ficha criada com sucesso:', res.data);
      set((state) => ({
        fichas: [...state.fichas, res.data],
        fichaAtual: res.data,
        loading: false,
      }));
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.erro || err.message || "Erro ao criar ficha";
      console.error('Erro ao criar ficha:', err.response?.data || err);
      set({
        error: errorMsg,
        loading: false,
      });
      return null;
    }
  },

  atualizarFicha: async (id, dados) => {
    set({ loading: true, error: null });
    try {
      console.log('Enviando dados para atualizar ficha:', { id, dados });
      const res = await api.put(`/api/fichas/${id}`, dados);
      console.log('Ficha atualizada com sucesso:', res.data);
      set((state) => ({
        fichas: state.fichas.map((f) => (f._id === id ? res.data : f)),
        fichaAtual: res.data,
        loading: false,
      }));
      return res.data;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.erro || err.message || "Erro ao atualizar ficha";
      console.error('Erro ao atualizar ficha:', err.response?.data || err);
      set({
        error: errorMsg,
        loading: false,
      });
      return null;
    }
  },

  atualizarCombate: async (id, dados) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`/api/fichas/${id}/combate`, dados);
      set((state) => ({
        fichas: state.fichas.map((f) => (f._id === id ? res.data : f)),
        fichaAtual: res.data,
        loading: false,
      }));
      return res.data;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Erro ao atualizar combate",
        loading: false,
      });
      return null;
    }
  },

  deletarFicha: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/api/fichas/${id}`);
      set((state) => ({
        fichas: state.fichas.filter((f) => f._id !== id),
        fichaAtual: state.fichaAtual?._id === id ? null : state.fichaAtual,
        loading: false,
      }));
      return true;
    } catch (err) {
      set({
        error: err.response?.data?.error || "Erro ao deletar ficha",
        loading: false,
      });
      return false;
    }
  },

  adicionarHabilidade: async (fichaId, habilidadeId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post(`/api/fichas/${fichaId}/habilidades`, {
        habilidadeId,
      });
      const fichaAtualizada = res.data;
      set((state) => ({
        fichas: state.fichas.map((f) => (f._id === fichaId ? fichaAtualizada : f)),
        fichaAtual: fichaAtualizada,
        loading: false,
      }));
      return fichaAtualizada;
    } catch (err) {
      const errorMsg = err.response?.data?.erro || err.response?.data?.error || err.message || "Erro ao adicionar habilidade";
      console.error('Erro ao adicionar habilidade:', err.response?.data || err);
      set({
        error: errorMsg,
        loading: false,
      });
      return null;
    }
  },

  removerHabilidade: async (fichaId, habilidadeId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete(
        `/api/fichas/${fichaId}/habilidades/${habilidadeId}`
      );
      const fichaAtualizada = res.data;
      set((state) => ({
        fichas: state.fichas.map((f) => (f._id === fichaId ? fichaAtualizada : f)),
        fichaAtual: fichaAtualizada,
        loading: false,
      }));
      return fichaAtualizada;
    } catch (err) {
      const errorMsg = err.response?.data?.erro || err.response?.data?.error || err.message || "Erro ao remover habilidade";
      console.error('Erro ao remover habilidade:', err.response?.data || err);
      set({
        error: errorMsg,
        loading: false,
      });
      return null;
    }
  },

  adicionarRitual: async (fichaId, ritualId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post(`/api/fichas/${fichaId}/rituais`, {
        ritualId,
      });
      const fichaAtualizada = res.data;
      set((state) => ({
        fichas: state.fichas.map((f) => (f._id === fichaId ? fichaAtualizada : f)),
        fichaAtual: fichaAtualizada,
        loading: false,
      }));
      return fichaAtualizada;
    } catch (err) {
      const errorMsg = err.response?.data?.erro || err.response?.data?.error || err.message || "Erro ao adicionar ritual";
      console.error('Erro ao adicionar ritual:', err.response?.data || err);
      set({
        error: errorMsg,
        loading: false,
      });
      return null;
    }
  },

  removerRitual: async (fichaId, ritualId) => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete(`/api/fichas/${fichaId}/rituais/${ritualId}`);
      const fichaAtualizada = res.data;
      set((state) => ({
        fichas: state.fichas.map((f) => (f._id === fichaId ? fichaAtualizada : f)),
        fichaAtual: fichaAtualizada,
        loading: false,
      }));
      return fichaAtualizada;
    } catch (err) {
      const errorMsg = err.response?.data?.erro || err.response?.data?.error || err.message || "Erro ao remover ritual";
      console.error('Erro ao remover ritual:', err.response?.data || err);
      set({
        error: errorMsg,
        loading: false,
      });
      return null;
    }
  },
}));

