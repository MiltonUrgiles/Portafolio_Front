// src/components/Header.js
import React from 'react';

export default function Header({ categorias, parciales, parcial, setParcial, categoria, setCategoria }) {
  return (
    <header>
      <div className="container">
        <h1>Matemáticas - Portafolio Digital</h1>

        <nav>
          {/* Parcial dropdown */}
          <div tabIndex={0}>
            <button>
              Parcial: {parcial} ▼
            </button>
            <div className="dropdown-menu">
              {parciales.map((p) => (
                <div key={p} onClick={() => setParcial(p)} tabIndex={0}>
                  {p}
                </div>
              ))}
            </div>
          </div>

          {/* Categoría dropdown */}
          <div tabIndex={0}>
            <button>
              Categoría: {categoria} ▼
            </button>
            <div className="dropdown-menu">
              {categorias.map((cat) => (
                <div key={cat} onClick={() => setCategoria(cat)} tabIndex={0}>
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
