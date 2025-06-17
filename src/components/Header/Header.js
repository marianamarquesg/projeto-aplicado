import { Link } from "react-router-dom";
import BotaoDetalhesUsuario from "./BotaoDetalhesUsuario"
import './Header.css';


function Header () {
    return (
        <header>
            <section id='header'>
                <h1 id='logo'>PlanejaObra</h1>
          
                <nav id='menu'>
                    <Link to='/obras'>Obras</Link>
                    <Link to='/Responsaveis'>Responsáveis</Link>
                </nav>
            
                <BotaoDetalhesUsuario/>
            </section>
        </header>
    )
} 
export default Header;