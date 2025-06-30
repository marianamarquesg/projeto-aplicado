import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Login.css';
import Botao from '../../components/Botao/Botao';
import Titulo from '../../components/Titulo/Titulo';
import InputForm from '../../components/Formulario/InputForm';
import Footer from '../../components/Footer/Footer';


function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioValido = usuarios.find(
      (usuario) => usuario.email === email && usuario.senha === senha
    );
    
    if (usuarioValido) {
  localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido));
  alert('Login realizado com sucesso!');
  window.location.href = '/obras';
} else {
  alert('Email ou senha inválidos!');
}

  }
  return (
      
    <div className="login-page">
    <div className="login-container">
      
      <Titulo>Faça seu login!</Titulo>

      <form className="login-form" onSubmit={handleSubmit}>
        <InputForm
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputForm
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />

        <Botao tipo="submit" className="login-button">Entrar</Botao>
      </form>

      <p>
        Não tem uma conta? <Link to="/register">Registre-se</Link>
      </p>
      
    </div>
    </div>
  );
}

export default Login;
