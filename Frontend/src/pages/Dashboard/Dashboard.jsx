import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { useFichaStore } from "../../store/useFichaStore";

export default function Dashboard() {
  const navigate = useNavigate();
  const { fichas, listarFichas, loading } = useFichaStore();

  useEffect(() => {
    listarFichas();
  }, [listarFichas]);

  // Redirect to fichas page
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/fichas", { replace: true });
    }, 100);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-red-600">Dashboard</h1>
          <Link
            to="/fichas/nova"
            className="btn-primary px-6 text-white"
          >
            Nova Ficha
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fichas.map((ficha) => (
              <Link
                key={ficha._id}
                to={`/fichas/${ficha._id}`}
                className="bg-zinc-900 rounded-lg p-6 border-2 border-red-600/50 red-border-glow hover:border-red-600 transition cursor-pointer"
              >
                <h3 className="text-xl font-semibold text-red-600 mb-2">
                  {ficha.nome || "Sem nome"}
                </h3>
                <div className="space-y-1 text-sm text-white">
                  {ficha.classe && <p>Classe: {ficha.classe}</p>}
                  {ficha.origem && <p>Origem: {ficha.origem}</p>}
                  {ficha.trilha && <p>Trilha: {ficha.trilha}</p>}
                </div>
                <div className="mt-4 pt-4 border-t border-red-600/30 flex gap-4 text-xs text-zinc-400">
                  <span>Vida: {ficha.combate?.vida_atual ?? 0}/{ficha.atributos?.vida ?? 0}</span>
                  <span>Sanidade: {ficha.combate?.sanidade_atual ?? 0}/{ficha.atributos?.sanidade ?? 0}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

