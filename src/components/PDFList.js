import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from './config';

export default function PDFList({ parcial, categoria }) {
  const [pdfs, setPdfs] = useState([]);
  const [errorCarga, setErrorCarga] = useState(null);

  const eliminarPDF = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este PDF?")) return;

    try {
      await axios.delete(`${BASE_URL}/${id}`);
      setPdfs((prev) => prev.filter((pdf) => pdf.Id !== id));
    } catch (error) {
      console.error("Error al eliminar PDF:", error);
      alert("No se pudo eliminar el PDF");
    }
  };

  useEffect(() => {
    setErrorCarga(null);
    
    const url = `${BASE_URL}?parcial=${encodeURIComponent(parcial)}&categoria=${encodeURIComponent(categoria)}`;
    console.log("Consultando:", url);

    axios
      .get(url, { headers: { Accept: 'application/json' } })
      .then((res) => {
        if (Array.isArray(res.data)) {
          console.log("PDFs cargados:", res.data);
          setPdfs(res.data);
        } else {
          console.warn("Respuesta inesperada:", res.data);
          setErrorCarga("La respuesta no es válida.");
          setPdfs([]);
        }
      })
      .catch((err) => {
        console.error("Error al obtener PDFs:", err);
        setErrorCarga("No se pudo cargar la lista de PDFs.");
        setPdfs([]);
      });
  }, [parcial, categoria]);

  const verPDF = (id) => {
    const url = `${BASE_URL}/${id}/download`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pdf-list-container">
      <h3 className="pdf-list-title">
        PDFs de {categoria} - {parcial}
      </h3>

      {errorCarga && <p style={{ color: 'red' }}>{errorCarga}</p>}

      {!errorCarga && (!Array.isArray(pdfs) || pdfs.length === 0) && (
        <p>No hay PDFs para mostrar.</p>
      )}

      <div className="pdf-grid">
        {Array.isArray(pdfs) &&
          pdfs.map((pdf) => (
            <div key={pdf.Id} className="pdf-item">
              <div className="pdf-name" title={pdf.Nombre}>
                {pdf.Nombre}
              </div>

              <div className="pdf-buttons">
                <button onClick={() => verPDF(pdf.Id)} className="btn-ver">
                  Ver
                </button>

                {/* Eliminar desactivado por ahora */}
                <button onClick={() => eliminarPDF(pdf.Id)} className="btn-eliminar">
                  Eliminar
                </button>

              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
