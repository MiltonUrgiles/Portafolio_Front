// src/App.js
import React, { useState } from 'react';
import UploadPDF from './components/UploadPDF';
import PDFList from './components/PDFList';
import Header from './components/Header'; // 👈 Importamos el componente
import fondo from './assets/sello-uta.png';
import './App.css';

const categorias = [
  'Materia',
  'Exámenes',
  'APES',
  'Deberes',
  'Consultas a mano',
  'Consultas a computadora',
  'EKOS',
  'Lectura Crítica',
  'EXCELENTES',
  'ANEXOS',
];

const parciales = ['Primer Parcial', 'Segundo Parcial'];

function App() {
  const [parcial, setParcial] = useState(parciales[0]);
  const [categoria, setCategoria] = useState(categorias[0]);

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }}
    >
      {/* HEADER como componente */}
      <Header
        categorias={categorias}
        parciales={parciales}
        parcial={parcial}
        setParcial={setParcial}
        categoria={categoria}
        setCategoria={setCategoria}
      />

      {/* CONTENIDO PRINCIPAL */}
      <main className="container mx-auto flex-grow p-6 bg-white/90 backdrop-blur-md rounded-b-lg shadow-xl mt-4">
        <UploadPDF parcial={parcial} categoria={categoria} categorias={categorias} />
        <hr className="my-6" />
        <PDFList parcial={parcial} categoria={categoria} />
      </main>

      {/* FOOTER */}
      <footer className="bg-indigo-700 text-white p-4 text-center mt-8">
        <p>© 2025 Universidad Técnica de Ambato - Facultad de Contabilidad y Auditoría</p>
      </footer>
    </div>
  );
}

export default App;
