import React from 'react';
import './Botao.css';

function Botao({ children, onClick, tipo = 'button', className = '', disabled = false }) {
  return (
    <button
      type={tipo}
      onClick={onClick}
      className={`botao ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Botao;
