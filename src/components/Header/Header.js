import { Link } from "react-router-dom";
import MenuHamburguer from "../MenuHamburguer/MenuHamburguer";

import './Header.css';

function Header () {
  return (
    <header>
      <section id='header'>
        <div className="logo-menu">
          <h1 id="logo">
            ObrasTrack
          </h1>
          <MenuHamburguer />
        </div>
      </section>
    </header>
  );
}

export default Header;
