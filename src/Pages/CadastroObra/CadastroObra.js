
import { useState, useEffect } from 'react';
import InputForm from '../../components/Formulario/InputForm';
import './CadastroObra.css';


function CadastroObra() {
  const [nomeObra, setNomeObra] = useState('');
  const [proprietario, setProprietario] = useState('');
  const [prazo, setPrazo] = useState('');
  const [dataFinal, setDataFinal] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [contatoProprietario, setContatoProprietario] = useState('');


  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [complemento, setComplemento] = useState('');

  useEffect(() => {
    const buscarEndereco = async () => {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setRua(data.logradouro);
          setBairro(data.bairro);
          setCidade(data.localidade); 
        } else {
          alert('CEP não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar endereço:', error);
      }
    };

    if (cep.length === 8) {
      buscarEndereco();
    } else {
      setRua('');
      setBairro('');
      setCidade('');
    }
  }, [cep]);

  const handleSubmit = () => {
    const obra = {
      nome: nomeObra,
      proprietario,
      endereco: {
        cep,
        rua,
        bairro,
        cidade,
        numero,
        complemento
      },
      prazo,
      dataFinal
    };

    console.log('Obra cadastrada:', obra);
  };

  return (
    <section className="cadastro-obra">
      <h3 className='titulo-cadastar-obra'>Criar nova obra</h3>
      <div className="inputs-cadastro-obra">
      <h4>Dados do Proprietário</h4>

        <InputForm className='duas-colunas' label="Nome do Proprietário" value={proprietario} onChange={(e) => setProprietario(e.target.value)} />
        <InputForm className='uma-coluna' label="Contato do Proprietário" value={contatoProprietario} onChange={(e) => setContatoProprietario(e.target.value)} />

        <h4>Dados da Obra</h4>
        <InputForm className='tres-colunas' label="Nome da Obra" value={nomeObra} onChange={(e) => setNomeObra(e.target.value)} />

        <InputForm className='uma-coluna' label="CEP" value={cep} maxLength={8} onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))} />
        <InputForm className='duas-colunas' label="Rua" value={rua} onChange={(e) => setRua(e.target.value)} />
        <InputForm className='duas-colunas' label="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
        <InputForm className='uma-coluna' label="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
        <InputForm className='uma-coluna'label="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
        <InputForm className='duas-colunas'label="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />

        <h4>Cronograma</h4>
        <InputForm label="Data Início" type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        <InputForm label="Data Final" type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} />
        <InputForm label="Prazo Estimado (dias)" value={prazo} onChange={(e) => setPrazo(e.target.value)} />

        <button className="botao-retangular" onClick={handleSubmit}>Salvar</button>
      </div>
    </section>
  );
}

export default CadastroObra;
