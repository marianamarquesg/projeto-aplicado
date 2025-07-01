import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Obras from './Pages/ObrasCadastradas/Obras';
// import Responsaveis from './Pages/Responsaveis/Responsaveis';
import CadastroObra from './Pages/CadastroObra/CadastroObra';
import DetalhesObra from './Pages/DetalhesObras/DetalhesObra';
import DetalhesPerfil from './Pages/Perfil/DetalhesPerfil';
import EditarPerfil from './Pages/Perfil/EditarPerfil';
import Login from './Pages/Login/Login';
import CadastroForm from './components/Formulario/CadastroForm';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home/Home';
import CadastroEtapas from './Pages/CadastroEtapas/CadastroEtapas';
import CadastroUsuario from './Pages/CadastroUsuario/CadastroUsuario';






function App() {
  return (
    <>
    <BrowserRouter>
    <Header id='header-style' />
    <main class='pages-background'>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<CadastroUsuario />} />
          <Route path='/obras' element={<Obras />} />

          <Route path='/cadastroobra' element={<CadastroObra />} />
          <Route path="/detalhesObra/:id" element={<DetalhesObra />} />
          <Route path='/cadastroobra' element={<CadastroObra />}/>
          <Route path='/detalhesperfil' element={<DetalhesPerfil/>}/>
          <Route path="/editar-perfil" element={<EditarPerfil />}/>
          <Route path="/home" element={<Home />} />
          <Route path='/cadastroetapas' element={<CadastroEtapas />} />

          {/* <Route path='/responsaveis' element={<Responsaveis />} /> */}
   
        </Routes>
        <Footer />
        
    </main>
    
    </BrowserRouter>
  </>
  );
}

export default App;
