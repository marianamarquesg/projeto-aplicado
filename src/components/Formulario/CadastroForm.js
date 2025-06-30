import React, { useState } from 'react';
import InputForm from '../../components/Formulario/InputForm';
import Botao from '../../components/Botao/Botao';
import Titulo from '../../components/Titulo/Titulo';
import { useNavigate } from 'react-router-dom';
import './CadastroForm.css';

function CadastroForm() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const funcao = 'engenheiro';

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!nome || !sobrenome || !email || !senha || senha !== confirmarSenha) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const dataAdmissao = new Date().toISOString().split('T')[0];

    const usuario = {
      nome,
      sobrenome,
      cpf,
      email,
      telefone,
      senha,
      funcao,
      dataAdmissao,
    };

    const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios')) || [];

    const emailJaExiste = usuariosExistentes.some(u => u.email === email);
    if (emailJaExiste) {
      alert('Esse e-mail já está cadastrado.');
      return;
    }

    usuariosExistentes.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes));
    alert('Cadastro realizado com sucesso!');
    navigate('/');
  }

  return (
    <div className="cadastro-container">
      <form className="form-cadastro" onSubmit={handleSubmit}>
        <Titulo>Criar Conta</Titulo>

        <div className="linha">
          <InputForm label="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <InputForm label="Sobrenome" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} />
        </div>

        <InputForm label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" />
        <InputForm label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu.email@exemplo.com" />
        <InputForm label="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} placeholder="(00) 00000-0000" />

        <label className="form-label">Função</label>
        <div className="funcoes centro">
          <div className="funcao-card ativo">
            🛠️<p>Engenheiro</p>
            <small>Responsável técnico pela obra</small>
          </div>
        </div>

        <div className="linha">
          <InputForm label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Crie uma senha" />
          <InputForm label="Confirmar Senha" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} placeholder="Confirme sua senha" />
        </div>

        <Botao tipo="submit">Criar Conta</Botao>
      </form>
    </div>
  );
}

export default CadastroForm;

