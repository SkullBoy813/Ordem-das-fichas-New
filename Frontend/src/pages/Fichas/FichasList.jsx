import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useFichaStore } from "../../store/useFichaStore";

export default function FichasList() {
  const { fichas, listarFichas, deletarFicha, loading } = useFichaStore();

  useEffect(() => {
    listarFichas();
  }, [listarFichas]);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Tem certeza que deseja deletar esta ficha?")) {
      await deletarFicha(id);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600">SUAS FICHAS</h1>
          <Link to="/fichas/nova" className="btn-secondary px-6 py-3">
            Criar ficha
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-white">Carregando...</div>
        ) : fichas.length === 0 ? (
          <div className="bg-zinc-900 rounded-lg p-8 text-center border-2 border-red-600/50 red-border-glow">
            <p className="text-white mb-4">Você ainda não tem fichas criadas.</p>
            <Link
              to="/fichas/nova"
              className="btn-primary px-6 text-white inline-block"
            >
              Criar Primeira Ficha
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {fichas.map((ficha) => (
              <Link
                key={ficha._id}
                to={`/fichas/${ficha._id}`}
                className="block bg-zinc-900 border-2 border-red-600/50 rounded-lg p-6 red-border-glow hover:border-red-600 transition"
              >
                <div className="flex items-center gap-6">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-zinc-800 border-2 border-red-600/50 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-2xl font-bold">
                      {(ficha.nome || "?").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  
                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {ficha.nome || "Sem nome"}
                    </h3>
                    <p className="text-white mb-3">{ficha.classe || "Sem classe"}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="w-3 h-3 rounded-full bg-red-600"></div>
                        ))}
                      </div>
                      <span className="text-white text-sm ml-2">
                        {ficha.atributos?.forca || 0} {ficha.atributos?.agilidade || 0} {ficha.atributos?.vigor || 0} {ficha.atributos?.inteligencia || 0} {ficha.atributos?.presenca || 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-sm">
                      <span className="text-red-600">📅</span>
                      <span>{ficha.createdAt ? new Date(ficha.createdAt).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(ficha._id, e);
                    }}
                    className="text-red-600 hover:text-red-500 text-sm px-4 py-2 border border-red-600/50 rounded hover:bg-red-600/10 transition"
                  >
                    Excluir
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

