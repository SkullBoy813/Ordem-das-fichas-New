import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Fichas from './pages/Fichas'
import ViewFicha from './pages/ViewFicha'
import CriarFicha from './pages/criar/CriarFicha' 
import Layout from './components/Layout' 

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route element={<Layout/>}>
          <Route path="/" element={<Home/>} />
          <Route path="/fichas" element={<Fichas/>} />
          <Route path="/ficha/:id" element={<ViewFicha/>} />
          <Route path="/criar-ficha/*" element={<CriarFicha/>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}