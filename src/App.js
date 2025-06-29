import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Obras from './Pages/ObrasCadastradas/Obras';
// import Responsaveis from './Pages/Responsaveis/Responsaveis';
import CadastroObra from './Pages/CadastroObra/CadastroObra';
import CadastroEtapas from './Pages/CadastroEtapas/CadastroEtapas';



function App() {
  return (
    <>
    <BrowserRouter>
    <Header id='header-style' />
    <main class='pages-background'>
      <Routes>
          <Route path='/obras' element={<Obras />} />
          <Route path='/cadastroobra' element={<CadastroObra />} />
          <Route path='/cadastroetapas' element={<CadastroEtapas />} />
          {/* <Route path='/responsaveis' element={<Responsaveis />} /> */}
   
        </Routes>
    </main>
    
    </BrowserRouter>
  </>
  );
}

export default App;
