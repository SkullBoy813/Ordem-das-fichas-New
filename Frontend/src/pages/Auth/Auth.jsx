import { useState, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Input from "../../components/Inputs";

export default function Auth() {
  const navigate = useNavigate();
  const { login, register, loading, error, checkAuth } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      const authenticated = await checkAuth();
      if (authenticated) {
        navigate("/dashboard");
      }
    };
    init();
  }, [checkAuth, navigate]);
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  
  function validate() {
    const newErrors = {};

    if (!form.email) newErrors.email = "Email obrigatório";
    else if (!form.email.includes("@"))
      newErrors.email = "Email inválido";

    if (!form.senha || form.senha.length < 6)
      newErrors.senha = "Senha deve ter no mínimo 6 caracteres";

    if (!isLogin) {
      if (!form.nome) newErrors.nome = "Nome obrigatório";

      if (form.senha !== form.confirmarSenha)
        newErrors.confirmarSenha = "Senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validate()) return;

    let ok = false;
    if (isLogin) {
      ok = await login(form.email, form.senha);
    } else {
      ok = await register({
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      });
      if (ok) {
        // After successful registration, switch to login
        setIsLogin(true);
        setForm({ nome: "", email: "", senha: "", confirmarSenha: "" });
      }
    }

    if (ok && isLogin) {
      navigate("/fichas");
    }
  }

  return (
    <div className="min-h-screen bg-transparent text-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section - Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          {/* Left Column - Text */}
          <div className="space-y-6 max-w-xl">
            <h1 className="text-5xl md:text-6xl font-extrabold text-red-600 leading-tight">CRIE, PERSONALIZE E ORGANIZE SUAS FICHAS DE RPG</h1>
            <p className="text-lg text-zinc-300">Uma plataforma simples e poderosa para jogadores e mestres — organize suas fichas com estilo e praticidade.</p>
            <div className="flex items-center gap-4">
              <Button onClick={() => { setIsLogin(false); setTimeout(() => document.getElementById('login-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100); }} className="px-6 py-3 text-lg">CRIAR MINHA FICHA</Button>
              <a href="#sobre" className="text-sm text-zinc-400 hover:text-zinc-200">Saiba mais</a>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="bg-zinc-800 p-4 rounded shadow-sm text-center">
                <div className="text-red-600 font-bold">Rápido</div>
                <div className="text-sm text-zinc-300">Crie fichas em instantes</div>
              </div>
              <div className="bg-zinc-800 p-4 rounded shadow-sm text-center">
                <div className="text-red-600 font-bold">Organizado</div>
                <div className="text-sm text-zinc-300">Tudo em um só lugar</div>
              </div>
              <div className="bg-zinc-800 p-4 rounded shadow-sm text-center">
                <div className="text-red-600 font-bold">Seguro</div>
                <div className="text-sm text-zinc-300">Acesso protegido por token</div>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="flex justify-center">
            <form id="login-form" onSubmit={handleSubmit} className="w-full max-w-md bg-zinc-900 border-2 border-red-600 p-8 rounded-lg red-border-glow shadow-xl">
              {!isLogin && (
                <Input name="nome" placeholder="Nome" value={form.nome} error={errors.nome} onChange={handleChange} />
              )}

              <Input name="email" placeholder="E-mail" value={form.email} error={errors.email} onChange={handleChange} />

              <Input type="password" name="senha" placeholder="Senha" value={form.senha} error={errors.senha} onChange={handleChange} />

              {!isLogin && (
                <Input type="password" name="confirmarSenha" placeholder="Confirmar senha" value={form.confirmarSenha} error={errors.confirmarSenha} onChange={handleChange} />
              )}

              <div className="flex gap-4 mt-2">
                <button type="submit" disabled={loading} className={`flex-1 btn-primary py-3 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                  {loading ? "Carregando..." : isLogin ? "Entrar" : "Cadastrar"}
                </button>
                <button type="button" onClick={() => { setIsLogin(!isLogin); setErrors({}); setForm({ nome: "", email: "", senha: "", confirmarSenha: "" }); }} className="flex-1 btn-secondary py-3">
                  {isLogin ? "Cadastrar" : "Entrar"}
                </button>
              </div>

              {error && <p className="text-red-500 text-sm text-center mt-3">{error}</p>}

              <p className="text-center text-sm text-zinc-400 mt-4 cursor-pointer hover:text-red-600">Esqueceu a senha?</p>
            </form>
          </div>
        </div>

        {/* Sobre o Projeto */}
        <section id="sobre" className="mb-16">
          <h2 className="text-3xl font-bold text-red-600 mb-6">SOBRE O PROJETO</h2>
          <p className="text-lg text-zinc-300 max-w-3xl">A Ordem das Fichas nasceu da paixão por RPG e pela vontade de tornar a criação de fichas mais rápida, moderna e leve. Aqui, jogadores e mestres têm tudo em um só lugar.</p>
        </section>

        {/* Como e Por Que */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-red-600 mb-6">COMO E POR QUE CRIAMOS O ORDEM DAS FICHAS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-zinc-300 mb-6">O projeto foi desenvolvido para colocar em prática os pilares do desenvolvimento web moderno. Nesse foco foi aplicar o que aprendemos no curso, criando uma aplicação completa — do front-end ao back-end.</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-red-600 mb-4">Tecnologias Utilizadas</h3>
              <ul className="space-y-2 text-zinc-300">
                <li><strong className="text-red-600">Front-end:</strong> React, Tailwind, CSS, Axios (HTTP Client)</li>
                <li><strong className="text-red-600">Back-end:</strong> Node.js, Express</li>
                <li><strong className="text-red-600">Banco de Dados:</strong> MongoDB</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

