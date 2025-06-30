import React from 'react';
import './Home.css';
import Footer from '../../components/Footer/Footer';

function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao ObrasTrack</h1>
      <p>
        O ObrasTrack é um sistema desenvolvido para auxiliar engenheiros civis e pequenas construtoras no acompanhamento de obras. A plataforma permite o cadastro, a visualização e o monitoramento de projetos, 
        facilitando a gestão de prazos e status, visando organizar o fluxo de trabalho e garantir a entrega no prazo.
      </p>
    </div>
  );
}

export default Home;
