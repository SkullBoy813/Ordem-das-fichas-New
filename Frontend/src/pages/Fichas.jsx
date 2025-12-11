import React, {useEffect, useState} from 'react'
import api from '../services/api'
import CardFicha from '../components/Cardficha'

export default function Fichas(){
  const [fichas, setFichas] = useState([])

  useEffect(()=> {
    api.get('/fichas').then(res => setFichas(res.data)).catch(console.error)
  }, [])

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl text-red-strong">Suas Fichas</h2>
        <button className="px-4 py-2 border border-red-700 rounded">Criar Ficha</button>
      </div>

      <div>
        {fichas.map(f => <CardFicha key={f._id} ficha={f} />)}
      </div>
    </div>
  )
}