import React from 'react';
import headerImage from '../assets/hed.png'; // tu imagen

export default function Header({ categorias, parciales, parcial, setParcial, categoria, setCategoria }) {
  return (
    <>
  <img src={headerImage} alt="Encabezado" className="imagen-encabezado" />
      
 <header>
        <h1>Matemáticas - Portafolio Digital</h1>
      </header>
      <div className="subheader">
        <nav>
          <div tabIndex={0}>
            <button>Parcial: {parcial} ▼</button>
            <div className="dropdown-menu">
              {parciales.map((p) => (
                <div key={p} onClick={() => setParcial(p)}>{p}</div>
              ))}
            </div>
          </div>

          <div tabIndex={0}>
            <button>Categoría: {categoria} ▼</button>
            <div className="dropdown-menu">
              {categorias.map((cat) => (
                <div key={cat} onClick={() => setCategoria(cat)}>{cat}</div>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
