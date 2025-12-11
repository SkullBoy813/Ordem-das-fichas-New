import create from 'zustand'
export const useFichaStore = create(set => ({
  ficha: null,
  setFicha: (f) => set({ ficha: f }),
  updateAtributo: (key, value) => set(state => ({ ficha: { ...state.ficha, atributos: { ...state.ficha.atributos, [key]: value }}}))
}))