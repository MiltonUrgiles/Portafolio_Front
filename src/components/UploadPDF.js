// src/components/UploadPDF.js
import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './config'; // Ajusta ruta si necesario

export default function UploadPDF({ parcial, categoria, categorias }) {
  const [archivo, setArchivo] = useState(null);
  const [cat, setCat] = useState(categoria);
  const [parc, setParc] = useState(parcial);
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!archivo) {
      setMensaje('Por favor selecciona un archivo PDF.');
      return;
    }

    setCargando(true);
    setMensaje('');

    try {
      const formData = new FormData();
      formData.append('pdf', archivo);
      formData.append('categoria', cat);
      formData.append('parcial', parc);

      const res = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMensaje('Archivo subido correctamente.');
      setArchivo(null);
      // Opcional: aquí podrías emitir un evento para actualizar la lista
    } catch (error) {
      console.error('Error subiendo archivo:', error);
      setMensaje('Error al subir el archivo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="bg-indigo-50 p-4 rounded shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-indigo-700">Subir un PDF</h3>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Archivo PDF:</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setArchivo(e.target.files[0])}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1 font-medium">Categoría:</label>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Parcial:</label>
        <select
          value={parc}
          onChange={(e) => setParc(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option>Primer Parcial</option>
          <option>Segundo Parcial</option>
        </select>
      </div>

      {mensaje && <p className="mb-4 text-center text-sm text-indigo-700">{mensaje}</p>}

      <button
        type="submit"
        disabled={cargando}
        className="w-full bg-indigo-700 text-white font-semibold py-2 rounded hover:bg-indigo-800 disabled:opacity-50"
      >
        {cargando ? 'Subiendo...' : 'Subir PDF'}
      </button>
    </form>
  );
}
