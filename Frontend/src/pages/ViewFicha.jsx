import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

export default function ViewFicha(){
  const { id } = useParams()
  const [ficha, setFicha] = useState(null)

  useEffect(()=>{
    api.get(`/fichas/${id}`).then(res => setFicha(res.data)).catch(console.error)
  }, [id])

  if(!ficha) return <div>Carregando...</div>

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2 p-4 bg-[#070707] rounded border border-red-900">
        <h3 className="text-xl text-red-strong">{ficha.nome} — {ficha.classe}</h3>
        {/* Atributos (mostre como no design) */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-[#0b0b0b] p-4 rounded">
            <h4 className="text-red-200">Atributos</h4>
            <ul className="mt-2 text-sm">
              <li>Força: {ficha.atributos.forca}</li>
              <li>Agilidade: {ficha.atributos.agilidade}</li>
              <li>Vigor: {ficha.atributos.vigor}</li>
              <li>Inteligência: {ficha.atributos.inteligencia}</li>
              <li>Presença: {ficha.atributos.presenca}</li>
            </ul>
          </div>
          <div className="bg-[#0b0b0b] p-4 rounded">
            <h4 className="text-red-200">Status</h4>
            <div>Vida: {ficha.atributos.vida} / Sanidade: {ficha.atributos.sanidade}</div>
            <div>Defesa: {ficha.atributos.defesa} • Bloqueio: {ficha.atributos.bloqueio}</div>
          </div>
        </div>
      </div>

      <aside className="p-4 bg-[#070707] rounded border border-red-900">
        <h4 className="text-red-strong">Habilidades</h4>
        <ul className="mt-2 text-sm">
          {ficha.habilidades.map(h => <li key={h._id}>{h.nome}</li>)}
        </ul>
      </aside>
    </div>
  )
}
