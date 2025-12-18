import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import Input from "../../components/Inputs";
import { useFichaStore } from "../../store/useFichaStore";
import { useHabilidadeStore } from "../../store/useHabilidadeStore";
import { useRitualStore } from "../../store/useRitualStore";

export default function FichaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isNew = id === "nova" || location.pathname.includes("/fichas/nova");

  const { fichaAtual, buscarFicha, criarFicha, atualizarFicha, atualizarCombate, adicionarHabilidade, removerHabilidade, adicionarRitual, removerRitual, limparFichaAtual, loading, error } = useFichaStore();
  const { habilidades, listarHabilidades } = useHabilidadeStore();
  const { rituais, listarRituais } = useRitualStore();

  const [form, setForm] = useState({
    nome: "",
    classe: "",
    origem: "",
    trilha: "",
    patente: "",
    nex: 0,
    atributos: {
      forca: 0,
      agilidade: 0,
      vigor: 0,
      inteligencia: 0,
      presenca: 0,
      vida: 0,
      sanidade: 0,
      defesa: 0,
      bloqueio: 0,
      esquiva: 0,
    },
    pericias: [],
    combate: {
      vida_atual: 0,
      sanidade_atual: 0,
      pe_atual: 0,
    },
    pe_maximo: 0,
    inventario: [],
    poderes_paranormais: [],
    anotacoes: "",
  });

  const [showHabilidades, setShowHabilidades] = useState(false);
  const [showRituais, setShowRituais] = useState(false);
  const [newPericia, setNewPericia] = useState({ nome: "", valor: 0, modificador: 0 });
  const [newItem, setNewItem] = useState({ nome: "", quantidade: 1, descricao: "" });
  const [newPoder, setNewPoder] = useState({ nome: "", descricao: "", custo_sanidade: 0 });
  const [saveMessage, setSaveMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    if (!isNew) {
      buscarFicha(id);
      listarHabilidades();
      listarRituais();
    } else {
      // Limpar qualquer ficha carregada anteriormente ao criar nova
      limparFichaAtual();
      listarHabilidades();
      listarRituais();
    }
  }, [id, isNew, buscarFicha, listarHabilidades, listarRituais, limparFichaAtual]);

  useEffect(() => {
    if (fichaAtual && !isNew) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        nome: fichaAtual.nome || "",
        classe: fichaAtual.classe || "",
        origem: fichaAtual.origem || "",
        trilha: fichaAtual.trilha || "",
        patente: fichaAtual.patente || "",
        nex: fichaAtual.nex || 0,
        atributos: {
          forca: fichaAtual.atributos?.forca || 0,
          agilidade: fichaAtual.atributos?.agilidade || 0,
          vigor: fichaAtual.atributos?.vigor || 0,
          inteligencia: fichaAtual.atributos?.inteligencia || 0,
          presenca: fichaAtual.atributos?.presenca || 0,
          vida: fichaAtual.atributos?.vida || 0,
          sanidade: fichaAtual.atributos?.sanidade || 0,
          defesa: fichaAtual.atributos?.defesa || 0,
          bloqueio: fichaAtual.atributos?.bloqueio || 0,
          esquiva: fichaAtual.atributos?.esquiva || 0,
        },
        pericias: fichaAtual.pericias || [],
        combate: {
          vida_atual: fichaAtual.combate?.vida_atual || 0,
          sanidade_atual: fichaAtual.combate?.sanidade_atual || 0,
          pe_atual: fichaAtual.combate?.pe_atual || 0,
        },
        pe_maximo: fichaAtual.pe_maximo || 0,
        inventario: fichaAtual.inventario || [],
        poderes_paranormais: fichaAtual.poderes_paranormais || [],
        anotacoes: fichaAtual.anotacoes || "",
      });
    }
  }, [fichaAtual, isNew]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("atributos.")) {
      const attrName = name.split(".")[1];
      setForm({
        ...form,
        atributos: {
          ...form.atributos,
          [attrName]: parseInt(value) || 0,
        },
      });
    } else if (name.startsWith("combate.")) {
      const combateName = name.split(".")[1];
      setForm({
        ...form,
        combate: {
          ...form.combate,
          [combateName]: parseInt(value) || 0,
        },
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveMessage({ type: "", text: "" });
    
    // Sanitizar dados antes de enviar - garantir que todos os campos estão no formato correto
    const dadosParaEnviar = {
      nome: form.nome || "",
      classe: form.classe || "",
      origem: form.origem || "",
      trilha: form.trilha || "",
      patente: form.patente || "",
      nex: Number(form.nex) || 0,
      atributos: {
        forca: Number(form.atributos?.forca) || 0,
        agilidade: Number(form.atributos?.agilidade) || 0,
        vigor: Number(form.atributos?.vigor) || 0,
        inteligencia: Number(form.atributos?.inteligencia) || 0,
        presenca: Number(form.atributos?.presenca) || 0,
        vida: Number(form.atributos?.vida) || 0,
        sanidade: Number(form.atributos?.sanidade) || 0,
        defesa: Number(form.atributos?.defesa) || 0,
        bloqueio: Number(form.atributos?.bloqueio) || 0,
        esquiva: Number(form.atributos?.esquiva) || 0,
      },
      pericias: Array.isArray(form.pericias) ? form.pericias.map(p => ({
        nome: p.nome || "",
        valor: Number(p.valor) || 0,
        modificador: Number(p.modificador) || 0,
      })) : [],
      combate: {
        vida_atual: Number(form.combate?.vida_atual) || 0,
        sanidade_atual: Number(form.combate?.sanidade_atual) || 0,
        pe_atual: Number(form.combate?.pe_atual) || 0,
      },
      pe_maximo: Number(form.pe_maximo) || 0,
      inventario: Array.isArray(form.inventario) ? form.inventario.map(i => ({
        nome: i.nome || "",
        quantidade: Number(i.quantidade) || 1,
        descricao: i.descricao || "",
      })) : [],
      poderes_paranormais: Array.isArray(form.poderes_paranormais) ? form.poderes_paranormais.map(p => ({
        nome: p.nome || "",
        descricao: p.descricao || "",
        custo_sanidade: Number(p.custo_sanidade) || 0,
      })) : [],
      anotacoes: form.anotacoes || "",
    };

    console.log('Dados sanitizados para enviar:', dadosParaEnviar);

    try {
      if (isNew) {
        const novaFicha = await criarFicha(dadosParaEnviar);
        console.log('Resposta criarFicha:', novaFicha);
        // Tentativa robusta de obter ID: do retorno, ou do store atualizado
        const newIdFromReturn = novaFicha?._id || novaFicha?.id;
        const newIdFromStore = useFichaStore.getState?.().fichaAtual?._id;
        const newId = newIdFromReturn || newIdFromStore;

        if (newId) {
          setSaveMessage({ type: "success", text: "Ficha criada com sucesso!" });
          setTimeout(() => {
            navigate(`/fichas/${newId}`);
          }, 1000);
        } else {
          console.error('Retorno inesperado ao criar ficha (id ausente):', novaFicha);
          setSaveMessage({ type: "error", text: error || "Ficha criada, mas não foi possível obter o ID." });
        }
      } else {
        // Usar fichaAtual._id como fonte principal, com fallback para id do params
        const fichaId = fichaAtual?._id || id;
        if (!fichaId) {
          setSaveMessage({ type: "error", text: "ID da ficha não encontrado" });
          return;
        }
        const resultado = await atualizarFicha(fichaId, dadosParaEnviar);
        if (resultado) {
          setSaveMessage({ type: "success", text: "Ficha salva com sucesso!" });
          // Atualizar o form com os dados retornados
          await buscarFicha(fichaId);
          setTimeout(() => {
            setSaveMessage({ type: "", text: "" });
          }, 3000);
        } else {
          setSaveMessage({ type: "error", text: error || "Erro ao salvar ficha" });
        }
      }
    } catch (error) {
      console.error('Erro no handleSubmit:', error);
      setSaveMessage({ type: "error", text: "Erro inesperado ao salvar" });
    }
  };

  // Create only handler for new fichas (called by explicit button)
  const handleCreate = async () => {
    setSaveMessage({ type: "", text: "" });
    const dadosParaEnviar = {
      nome: form.nome || "",
      classe: form.classe || "",
      origem: form.origem || "",
      trilha: form.trilha || "",
      patente: form.patente || "",
      nex: Number(form.nex) || 0,
      atributos: {
        forca: Number(form.atributos?.forca) || 0,
        agilidade: Number(form.atributos?.agilidade) || 0,
        vigor: Number(form.atributos?.vigor) || 0,
        inteligencia: Number(form.atributos?.inteligencia) || 0,
        presenca: Number(form.atributos?.presenca) || 0,
        vida: Number(form.atributos?.vida) || 0,
        sanidade: Number(form.atributos?.sanidade) || 0,
        defesa: Number(form.atributos?.defesa) || 0,
        bloqueio: Number(form.atributos?.bloqueio) || 0,
        esquiva: Number(form.atributos?.esquiva) || 0,
      },
      pericias: Array.isArray(form.pericias) ? form.pericias.map(p => ({
        nome: p.nome || "",
        valor: Number(p.valor) || 0,
        modificador: Number(p.modificador) || 0,
      })) : [],
      combate: {
        vida_atual: Number(form.combate?.vida_atual) || 0,
        sanidade_atual: Number(form.combate?.sanidade_atual) || 0,
        pe_atual: Number(form.combate?.pe_atual) || 0,
      },
      pe_maximo: Number(form.pe_maximo) || 0,
      inventario: Array.isArray(form.inventario) ? form.inventario.map(i => ({
        nome: i.nome || "",
        quantidade: Number(i.quantidade) || 1,
        descricao: i.descricao || "",
      })) : [],
      poderes_paranormais: Array.isArray(form.poderes_paranormais) ? form.poderes_paranormais.map(p => ({
        nome: p.nome || "",
        descricao: p.descricao || "",
        custo_sanidade: Number(p.custo_sanidade) || 0,
      })) : [],
      anotacoes: form.anotacoes || "",
    };

    try {
      const novaFicha = await criarFicha(dadosParaEnviar);
      console.log('Resposta criarFicha (handleCreate):', novaFicha);
      const newId = novaFicha?._id || novaFicha?.id || useFichaStore.getState?.().fichaAtual?._id;
      if (newId) {
        setSaveMessage({ type: "success", text: "Ficha criada com sucesso!" });
        setTimeout(() => {
          navigate(`/fichas/${newId}`);
        }, 500);
      } else {
        setSaveMessage({ type: "error", text: "Ficha criada, mas não foi possível obter o ID." });
      }
    } catch (err) {
      console.error('Erro no handleCreate:', err);
      setSaveMessage({ type: "error", text: "Erro ao criar ficha" });
    }
  };

  const handleAddPericia = () => {
    if (newPericia.nome) {
      setForm({
        ...form,
        pericias: [...form.pericias, { ...newPericia }],
      });
      setNewPericia({ nome: "", valor: 0, modificador: 0 });
    }
  };

  const handleRemovePericia = (index) => {
    setForm({
      ...form,
      pericias: form.pericias.filter((_, i) => i !== index),
    });
  };

  const handleAddItem = () => {
    if (newItem.nome) {
      setForm({
        ...form,
        inventario: [...form.inventario, { ...newItem }],
      });
      setNewItem({ nome: "", quantidade: 1, descricao: "" });
    }
  };

  const handleRemoveItem = (index) => {
    setForm({
      ...form,
      inventario: form.inventario.filter((_, i) => i !== index),
    });
  };

  const handleAddPoder = () => {
    if (newPoder.nome) {
      setForm({
        ...form,
        poderes_paranormais: [...form.poderes_paranormais, { ...newPoder }],
      });
      setNewPoder({ nome: "", descricao: "", custo_sanidade: 0 });
    }
  };

  const handleRemovePoder = (index) => {
    setForm({
      ...form,
      poderes_paranormais: form.poderes_paranormais.filter((_, i) => i !== index),
    });
  };

  const handleUpdateCombate = async () => {
    const fichaId = fichaAtual?._id || (isNew ? null : id);
    if (!fichaId) {
      setSaveMessage({ type: "error", text: "Crie a ficha antes de atualizar combate." });
      return;
    }
    await atualizarCombate(fichaId, form.combate);
    if (!isNew) await buscarFicha(fichaId); // Refresh ficha
  };

  const handleAddHabilidade = async (habilidadeId) => {
    try {
      const fichaId = fichaAtual?._id || (isNew ? null : id);
      if (!fichaId) {
        setSaveMessage({ type: "error", text: "Crie a ficha antes de adicionar habilidades." });
        return;
      }
      const result = await adicionarHabilidade(fichaId, habilidadeId);
      if (result) {
        // O store já atualiza fichaAtual, evitar buscar quando estiver criando a ficha
        if (!isNew) await buscarFicha(fichaId);
      } else {
        console.error('Erro ao adicionar habilidade');
      }
    } catch (error) {
      console.error('Erro ao adicionar habilidade:', error);
    }
  };

  const handleRemoveHabilidade = async (habilidadeId) => {
    try {
      const fichaId = fichaAtual?._id || (isNew ? null : id);
      if (!fichaId) {
        setSaveMessage({ type: "error", text: "Crie a ficha antes de remover habilidades." });
        return;
      }
      const result = await removerHabilidade(fichaId, habilidadeId);
      if (result) {
        if (!isNew) await buscarFicha(fichaId);
      } else {
        console.error('Erro ao remover habilidade');
      }
    } catch (error) {
      console.error('Erro ao remover habilidade:', error);
    }
  };

  const handleAddRitual = async (ritualId) => {
    try {
      const fichaId = fichaAtual?._id || (isNew ? null : id);
      if (!fichaId) {
        setSaveMessage({ type: "error", text: "Crie a ficha antes de adicionar rituais." });
        return;
      }
      const result = await adicionarRitual(fichaId, ritualId);
      if (result) {
        if (!isNew) await buscarFicha(fichaId);
      } else {
        console.error('Erro ao adicionar ritual');
      }
    } catch (error) {
      console.error('Erro ao adicionar ritual:', error);
    }
  };

  const handleRemoveRitual = async (ritualId) => {
    try {
      const fichaId = fichaAtual?._id || (isNew ? null : id);
      if (!fichaId) {
        setSaveMessage({ type: "error", text: "Crie a ficha antes de remover rituais." });
        return;
      }
      const result = await removerRitual(fichaId, ritualId);
      if (result) {
        if (!isNew) await buscarFicha(fichaId);
      } else {
        console.error('Erro ao remover ritual');
      }
    } catch (error) {
      console.error('Erro ao remover ritual:', error);
    }
  };

  if (loading && !isNew && !fichaAtual) {
    return (
      <Layout>
        <div className="text-center py-12 text-white">Carregando...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600">
            {isNew ? "Criador de ficha" : "Criador de ficha"}
          </h1>
          <div className="flex items-center gap-4">
            {saveMessage.text && (
              <p className={`text-sm ${
                saveMessage.type === "success" ? "text-green-500" : "text-red-500"
              }`}>
                {saveMessage.text}
              </p>
            )}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
              {isNew ? (
                <button
                  type="button"
                  onClick={handleCreate}
                  disabled={loading}
                  className={`btn-primary px-6 py-3 text-white ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Criando..." : "Criar ficha"}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn-primary px-6 py-3 text-white ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Salvando..." : "Salvar"}
                </button>
              )}
          
          </div>
        </div>

        {/* Informações Básicas */}
        <section className="bg-zinc-900 rounded-lg p-6 border-2 border-red-600/50 red-border-glow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Ficha do personagem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
            />
            <Input
              label="Classe"
              name="classe"
              value={form.classe}
              onChange={handleChange}
            />
            <Input
              label="Origem"
              name="origem"
              value={form.origem}
              onChange={handleChange}
            />
            <Input
              label="Trilha"
              name="trilha"
              value={form.trilha}
              onChange={handleChange}
            />
            <Input
              label="Patente"
              name="patente"
              value={form.patente}
              onChange={handleChange}
            />
            <Input
              label="NEX (%)"
              name="nex"
              type="number"
              value={form.nex}
              onChange={handleChange}
              min="0"
              max="99"
            />
          </div>
        </section>

        {/* Atributos */}
        <section className="bg-zinc-900 rounded-lg p-6 border-2 border-red-600/50 red-border-glow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Atributos</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Input
              label="Força"
              name="atributos.forca"
              type="number"
              value={form.atributos.forca}
              onChange={handleChange}
            />
            <Input
              label="Agilidade"
              name="atributos.agilidade"
              type="number"
              value={form.atributos.agilidade}
              onChange={handleChange}
            />
            <Input
              label="Vigor"
              name="atributos.vigor"
              type="number"
              value={form.atributos.vigor}
              onChange={handleChange}
            />
            <Input
              label="Inteligência"
              name="atributos.inteligencia"
              type="number"
              value={form.atributos.inteligencia}
              onChange={handleChange}
            />
            <Input
              label="Presença"
              name="atributos.presenca"
              type="number"
              value={form.atributos.presenca}
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
            <Input
              label="Vida"
              name="atributos.vida"
              type="number"
              value={form.atributos.vida}
              onChange={handleChange}
            />
            <Input
              label="Sanidade"
              name="atributos.sanidade"
              type="number"
              value={form.atributos.sanidade}
              onChange={handleChange}
            />
            <Input
              label="Defesa"
              name="atributos.defesa"
              type="number"
              value={form.atributos.defesa}
              onChange={handleChange}
            />
            <Input
              label="Bloqueio"
              name="atributos.bloqueio"
              type="number"
              value={form.atributos.bloqueio}
              onChange={handleChange}
            />
            <Input
              label="Esquiva"
              name="atributos.esquiva"
              type="number"
              value={form.atributos.esquiva}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* PE Máximo */}
        <section className="bg-zinc-900 rounded-lg p-6 border-2 border-red-600/50 red-border-glow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Pontos de Esforço</h2>
          <Input
            label="PE Máximo"
            name="pe_maximo"
            type="number"
            value={form.pe_maximo}
            onChange={handleChange}
            min="0"
          />
        </section>

        {/* Combate */}
        {!isNew && (
          <section className="bg-zinc-900 rounded-lg p-6 border-2 border-red-600/50 red-border-glow">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Combate</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Input
                label="Vida Atual"
                name="combate.vida_atual"
                type="number"
                value={form.combate.vida_atual}
                onChange={handleChange}
                max={form.atributos.vida}
                min="0"
              />
              <Input
                label="Sanidade Atual"
                name="combate.sanidade_atual"
                type="number"
                value={form.combate.sanidade_atual}
                onChange={handleChange}
                max={form.atributos.sanidade}
                min="0"
              />
              <Input
                label="PE Atual"
                name="combate.pe_atual"
                type="number"
                value={form.combate.pe_atual}
                onChange={handleChange}
                max={form.pe_maximo}
                min="0"
              />
            </div>
            <button
              type="button"
              onClick={handleUpdateCombate}
              className="mt-4 btn-primary px-4 text-white"
            >
              Atualizar Combate
            </button>
          </section>
        )}

        {/* Perícias */}
        <section className="bg-zinc-900 rounded-lg p-6 border-2 border-red-600/50 red-border-glow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Pericias</h2>
              <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Nome da perícia"
              value={newPericia.nome}
              onChange={(e) => setNewPericia({ ...newPericia, nome: e.target.value })}
              className="input flex-1 text-white placeholder:text-zinc-500"
            />
            <input
              type="number"
              placeholder="Valor"
              value={newPericia.valor}
              onChange={(e) => setNewPericia({ ...newPericia, valor: parseInt(e.target.value) || 0 })}
              className="input w-24 text-white"
            />
            <input
              type="number"
              placeholder="Modificador"
              value={newPericia.modificador}
              onChange={(e) => setNewPericia({ ...newPericia, modificador: parseInt(e.target.value) || 0 })}
              className="input w-32 text-white"
            />
            <button
              type="button"
              onClick={handleAddPericia}
              className="btn-primary px-4 py-2 text-white"
            >
              Adicionar
            </button>
          </div>
          <div className="space-y-2">
            {form.pericias.map((pericia, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-zinc-800 p-3 rounded"
              >
                <span className="flex-1 font-semibold">{pericia.nome}</span>
                <span className="text-zinc-400">Valor: {pericia.valor}</span>
                <span className="text-zinc-400">Mod: {pericia.modificador}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePericia(index)}
                  className="text-red-600 hover:text-red-500"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Habilidades */}
        {!isNew && (
          <section className="bg-zinc-900 rounded-lg p-6 border-2 border-red-600/50 red-border-glow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-red-600">Habilidade</h2>
              <button
                type="button"
                onClick={() => setShowHabilidades(!showHabilidades)}
                className="btn-primary px-4 py-2 text-white text-sm"
              >
                {showHabilidades ? "Fechar" : "Nova Habilidade"}
              </button>
            </div>
            {showHabilidades && (
              <div className="mb-4 p-4 bg-zinc-800 rounded max-h-60 overflow-y-auto">
                {habilidades.length === 0 ? (
                  <p className="text-zinc-400 text-sm">Nenhuma habilidade disponível</p>
                ) : (
                  habilidades.map((hab) => {
                    const hasHabilidade = fichaAtual?.habilidades?.some(
                      (h) => {
                        const hId = typeof h === 'object' ? h._id : h;
                        const habId = typeof hab === 'object' ? hab._id : hab;
                        return String(hId) === String(habId);
                      }
                    );
                    return (
                      <div
                        key={hab._id || hab}
                        className="flex justify-between items-center p-2 hover:bg-zinc-700 rounded"
                      >
                        <div>
                          <p className="font-semibold">{hab.nome || hab}</p>
                          <p className="text-sm text-zinc-400">{hab.descricao || ''}</p>
                        </div>
                        {hasHabilidade ? (
                          <button
                            type="button"
                            onClick={() => handleRemoveHabilidade(hab._id || hab)}
                            className="text-red-600 hover:text-red-500 text-sm"
                          >
                            Remover
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddHabilidade(hab._id || hab)}
                            className="btn-primary px-3 text-white text-sm"
                          >
                            Adicionar
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
            <div className="space-y-2">
              {fichaAtual?.habilidades?.map((hab) => (
                <div
                  key={hab._id || hab}
                  className="bg-zinc-800 p-3 rounded"
                >
                  <p className="font-semibold">{hab.nome || hab}</p>
                  {hab.descricao && (
                    <p className="text-sm text-zinc-400">{hab.descricao}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Rituais */}
        {!isNew && (
          <section className="bg-zinc-900 rounded-lg p-6 border-2 border-red-600/50 red-border-glow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-red-600">Rituais</h2>
              <button
                type="button"
                onClick={() => setShowRituais(!showRituais)}
                className="btn-primary px-4 py-2 text-white text-sm"
              >
                {showRituais ? "Fechar" : "Novo Ritual"}
              </button>
            </div>
            {showRituais && (
              <div className="mb-4 p-4 bg-zinc-800 rounded max-h-60 overflow-y-auto">
                {rituais.length === 0 ? (
                  <p className="text-zinc-400 text-sm">Nenhum ritual disponível</p>
                ) : (
                  rituais.map((ritual) => {
                    const hasRitual = fichaAtual?.rituais?.some(
                      (r) => {
                        const rId = typeof r === 'object' ? r._id : r;
                        const ritualId = typeof ritual === 'object' ? ritual._id : ritual;
                        return String(rId) === String(ritualId);
                      }
                    );
                    return (
                      <div
                        key={ritual._id || ritual}
                        className="flex justify-between items-center p-2 hover:bg-zinc-700 rounded"
                      >
                        <div>
                          <p className="font-semibold">
                            {ritual.nome || ritual} - Círculo {ritual.circulo || ''}
                          </p>
                          <p className="text-sm text-zinc-400">
                            {ritual.elemento || ''} - {ritual.descricao || ''}
                          </p>
                        </div>
                        {hasRitual ? (
                          <button
                            type="button"
                            onClick={() => handleRemoveRitual(ritual._id || ritual)}
                            className="text-red-600 hover:text-red-500 text-sm"
                          >
                            Remover
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleAddRitual(ritual._id || ritual)}
                            className="btn-primary px-3 text-white text-sm"
                          >
                            Adicionar
                          </button>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
            <div className="space-y-2">
              {fichaAtual?.rituais?.map((ritual) => (
                <div
                  key={ritual._id || ritual}
                  className="bg-zinc-800 p-3 rounded"
                >
                  <p className="font-semibold">
                    {ritual.nome || ritual} - Círculo {ritual.circulo || ""}
                  </p>
                  {ritual.elemento && (
                    <p className="text-sm text-zinc-400">
                      {ritual.elemento} - {ritual.descricao}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Inventário */}
        <section className="bg-zinc-900 rounded-lg p-6 border-2 border-red-600/50 red-border-glow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Inventário</h2>
          <div className="flex gap-2 mb-4 flex-wrap">
            <input
              type="text"
              placeholder="Nome do item"
              value={newItem.nome}
              onChange={(e) => setNewItem({ ...newItem, nome: e.target.value })}
              className="input flex-1 min-w-[200px] text-white placeholder:text-zinc-500"
            />
            <input
              type="number"
              placeholder="Quantidade"
              value={newItem.quantidade}
              onChange={(e) => setNewItem({ ...newItem, quantidade: parseInt(e.target.value) || 1 })}
              className="input w-24 text-white placeholder:text-zinc-500"
            />
            <input
              type="text"
              placeholder="Descrição"
              value={newItem.descricao}
              onChange={(e) => setNewItem({ ...newItem, descricao: e.target.value })}
              className="input flex-1 min-w-[200px] text-white placeholder:text-zinc-500"
            />
            <button
              type="button"
              onClick={handleAddItem}
              className="btn-primary px-4 text-white"
            >
              Adicionar
            </button>
          </div>
          <div className="space-y-2">
            {form.inventario.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-zinc-800 p-3 rounded"
              >
                <span className="flex-1 font-semibold">{item.nome}</span>
                <span className="text-zinc-400">Qtd: {item.quantidade}</span>
                {item.descricao && (
                  <span className="text-zinc-400 text-sm hidden md:inline">{item.descricao}</span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className="text-red-600 hover:text-red-500"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Poderes Paranormais */}
        <section className="bg-zinc-900 rounded-lg p-6 border-2 border-red-600/50 red-border-glow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Poderes Paranormais</h2>
          <div className="flex gap-2 mb-4 flex-wrap">
            <input
              type="text"
              placeholder="Nome do poder"
              value={newPoder.nome}
              onChange={(e) => setNewPoder({ ...newPoder, nome: e.target.value })}
              className="input flex-1 min-w-[200px] text-white placeholder:text-zinc-500"
            />
            <input
              type="number"
              placeholder="Custo Sanidade"
              value={newPoder.custo_sanidade}
              onChange={(e) => setNewPoder({ ...newPoder, custo_sanidade: parseInt(e.target.value) || 0 })}
              className="input w-32 text-white placeholder:text-zinc-500"
            />
            <input
              type="text"
              placeholder="Descrição"
              value={newPoder.descricao}
              onChange={(e) => setNewPoder({ ...newPoder, descricao: e.target.value })}
              className="input flex-1 min-w-[200px] text-white placeholder:text-zinc-500"
            />
            <button
              type="button"
              onClick={handleAddPoder}
              className="btn-primary px-4 text-white"
            >
              Adicionar
            </button>
          </div>
          <div className="space-y-2">
            {form.poderes_paranormais.map((poder, index) => (
              <div
                key={index}
                className="bg-zinc-800 p-3 rounded"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold">{poder.nome}</p>
                    {poder.descricao && (
                      <p className="text-sm text-zinc-400 mt-1">{poder.descricao}</p>
                    )}
                    <p className="text-xs text-zinc-500 mt-1">Custo: {poder.custo_sanidade} Sanidade</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemovePoder(index)}
                    className="text-red-600 hover:text-red-500 ml-4"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Anotações */}
        <section className="bg-zinc-900 rounded-lg p-6 border-2 border-red-600/50 red-border-glow">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Anotações</h2>
          <textarea
            name="anotacoes"
            value={form.anotacoes}
            onChange={handleChange}
            placeholder="Anotações gerais sobre o personagem..."
            className="input text-white placeholder:text-zinc-500 w-full min-h-[150px] resize-y"
            rows="6"
          />
        </section>
      </form>
    </Layout>
  );
}



