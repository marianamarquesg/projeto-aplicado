import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './MenuHamburguer.css';
import Obras from '../../Pages/ObrasCadastradas/Obras';
import DetalhesPerfil from '../../Pages/Perfil/DetalhesPerfil';


//import DetalhesObras from '../../Pages/DetalhesObras/DetalhesObras';

function MenuHamburguer() {
  const location = useLocation();
  const [aberto, setAberto] = useState(false);

  const toggleMenu = () => setAberto(!aberto);

  const rotasOcultas = ['/', '/cadastro'];

  if (rotasOcultas.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="menu-hamburguer-container">
      <button className="menu-botao" onClick={toggleMenu}>
        Menu
      </button>

      <nav className={`menu-links ${aberto ? 'aberto' : ''}`}>
        <Link to="/home" onClick={toggleMenu}>Sobre o ObrasTrack</Link>
        <Link to="/obras" onClick={toggleMenu}>Obras</Link>
        <Link to="/detalhesperfil" onClick={toggleMenu}>Perfil</Link>
        <Link to="/" onClick={toggleMenu}>Sair</Link>
      </nav>
    </div>
  );
}

export default MenuHamburguer;