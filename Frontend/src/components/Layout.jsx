import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function Layout(){
  return (
    <div className="min-h-screen flex">
      <aside className="w-20 bg-[#080808] border-r border-red-900 p-4">
        {/* ícones (pode trocar por svg) */}
        <div className="text-red-strong mb-6">⚙</div>
        <nav className="flex flex-col gap-6 text-sm text-red-300">
          <Link to="/">INÍCIO</Link>
          <Link to="/fichas">FICHAS</Link>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl text-red-strong font-bold">ORDEM FICHAS</h1>
          <div className="text-sm text-red-200">Usuário • Sair</div>
        </header>

        <section className="bg-panel rounded-2xl p-6 shadow-glow-red border border-red-900">
          <Outlet/>
        </section>
      </main>
    </div>
  )
}