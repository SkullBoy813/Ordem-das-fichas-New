import React from 'react'
import { Link } from 'react-router-dom'

export default function CardFicha({ficha}){
  return (
    <div className="bg-[#0c0c0c] border border-red-800 p-4 rounded-lg mb-4">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-red-dark rounded-md"></div>
        <div>
          <h3 className="text-red-strong font-bold">{ficha.nome}</h3>
          <p className="text-sm text-red-200">{ficha.classe} • {ficha.trilha}</p>
          <div className="text-xs text-gray-400 mt-2">
            VIDA {ficha.atributos.vida} • SAN {ficha.atributos.sanidade}
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <Link to={`/ficha/${ficha._id}`} className="px-3 py-1 border border-red-700 rounded">Abrir</Link>
      </div>
    </div>
  )
}
