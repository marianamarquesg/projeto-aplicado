import React from 'react';
import { useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao/Botao';
import InputForm from '../../components/Formulario/InputForm';
import './DetalhesPerfil.css';

function DetalhesPerfil() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!usuario) {
    return <p>Usuário não logado.</p>;
  }

  return (
    <div className="container">
      <h2>Perfil do Usuário</h2>

      <InputForm label="Nome" value={`${usuario.nome} ${usuario.sobrenome}`} disabled />
      <InputForm label="Cargo" value={usuario.funcao} disabled />
      <InputForm label="Departamento" value="Engenharia Civil" disabled />
      <InputForm label="Data de Admissão" type="date" value={usuario.dataAdmissao} disabled />
      <InputForm label="Email" value={usuario.email} disabled />
      <InputForm label="Telefone" value={usuario.telefone} disabled />

      <Botao onClick={() => navigate('/editar-perfil')}>Editar</Botao>
    </div>
  );
}

export default DetalhesPerfil;



