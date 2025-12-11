import { Routes, Route } from "react-router-dom";
import Atributos from "./Atributos";
import Habilidades from "./Habilidades";
import Pericias from "./Pericias";
import Rituais from "./Rituais";

export default function CriarFicha() {
  return (
    <Routes>
      <Route path="/" element={<Atributos />} />
      <Route path="/habilidades" element={<Habilidades />} />
      <Route path="/pericias" element={<Pericias />} />
      <Route path="/rituais" element={<Rituais />} />
    </Routes>
  );
}