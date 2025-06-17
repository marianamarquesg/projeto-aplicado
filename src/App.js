import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Obras from './Pages/Obra/Obras';
import Responsaveis from './Pages/Responsaveis/Responsaveis';


function App() {
  return (
    <>
    <BrowserRouter>
    <Header id='header-style' />
    <main class='pages-background'>
      <Routes>
          {/* <Route path='/' element={<Header />} /> */}
          <Route path='/obras' element={<Obras />} />
          <Route path='/responsaveis' element={<Responsaveis />} />
        
        </Routes>
    </main>
    
    </BrowserRouter>
  </>
  );
}

export default App;
