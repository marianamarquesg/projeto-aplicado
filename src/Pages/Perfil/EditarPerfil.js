import React, { useState, useEffect } from 'react';
import InputForm from '../../components/Formulario/InputForm';
import { useNavigate } from 'react-router-dom';
import Botao from '../../components/Botao/Botao';
import './EditarPerfil.css';

function EditarPerfil() {
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cargo, setCargo] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataAdmissao, setDataAdmissao] = useState('');

  useEffect(() => {
    if (usuarioLogado) {
      setNome(usuarioLogado.nome);
      setSobrenome(usuarioLogado.sobrenome);
      setCargo(usuarioLogado.funcao || '');
      setDepartamento('Engenharia Civil');
      setEmail(usuarioLogado.email);
      setTelefone(usuarioLogado.telefone);
      setDataAdmissao(usuarioLogado.dataAdmissao || new Date().toISOString().split('T')[0]);
    }
  }, []);

  function salvarAlteracoes() {
    const novosDados = {
      ...usuarioLogado,
      nome,
      sobrenome,
      funcao: cargo,
      telefone,
      email,
      dataAdmissao,
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.email === usuarioLogado.email);

    if (index !== -1) {
      usuarios[index] = novosDados;
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      localStorage.setItem('usuarioLogado', JSON.stringify(novosDados));
      alert('Perfil atualizado com sucesso!');
    }

    navigate('/detalhesperfil');
  }

  function cancelarEdicao() {
    navigate('/detalhesperfil');
  }

  return (
    <div className="container-editar-perfil">
      <h2>Editar Perfil</h2>

      <InputForm label="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <InputForm label="Sobrenome" value={sobrenome} onChange={e => setSobrenome(e.target.value)} />
      <InputForm label="Cargo" value={cargo} onChange={e => setCargo(e.target.value)} />
      <InputForm label="Departamento" value={departamento} onChange={e => setDepartamento(e.target.value)} />
      <InputForm label="Data de Admissão" type="date" value={dataAdmissao} disabled />
      <InputForm label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
      <InputForm label="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} />

      <Botao onClick={cancelarEdicao}>Cancelar</Botao>
      <Botao onClick={salvarAlteracoes}>Salvar</Botao>
    </div>
  );
}

export default EditarPerfil;
