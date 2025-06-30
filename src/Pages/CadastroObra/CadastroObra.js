import { useState, useEffect } from 'react';
import InputForm from '../../components/Formulario/InputForm';
import TituloH3 from '../../components/Titulos/TituloH3';
import './CadastroObra.css';
import { useNavigate } from 'react-router-dom';

function CadastroObra() {
  const [nomeObra, setNomeObra] = useState('');
  const [proprietario, setProprietario] = useState('');
  const [prazo, setPrazo] = useState('');         // y - total
  const [diasPassados, setDiasPassados] = useState(''); // x - atual
  const [dataFinal, setDataFinal] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [contatoProprietario, setContatoProprietario] = useState('');

  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [complemento, setComplemento] = useState('');
  const [observacao, setObservacao] = useState('');

  const navigate = useNavigate();

const seguir = (e) => {
  e.preventDefault();

  if (!proprietario || !nomeObra || !cep || !rua || !bairro || !cidade || !numero || !dataInicio || !dataFinal) {
    alert('Preencha todos os campos obrigatórios antes de continuar.');
    return;
  }

  const novaObra = {
    id: Date.now(), // Garante ID único
    nome: nomeObra,
    proprietario,
    contatoProprietario,
    endereco: {
      cep,
      rua,
      bairro,
      cidade,
      numero,
      complemento
    },
    prazo,
    dataFinal,
    dataInicio,
    observacao,
    status: 'Em Andamento'
  };

  // Salvar na lista de obras salvas (para listagem e detalhes)
  const obrasSalvas = JSON.parse(localStorage.getItem('obrasSalvas')) || [];
  obrasSalvas.push(novaObra);
  localStorage.setItem('obrasSalvas', JSON.stringify(obrasSalvas));

  // Também salva como obra em andamento (se quiser continuar para etapas)
  localStorage.setItem('obraEmAndamento', JSON.stringify(novaObra));
  localStorage.setItem('etapas', JSON.stringify([]));

  navigate('/cadastroEtapas');
};

  const cancelar = (e) => {
    e.preventDefault();
    navigate('/obras');
  };

  // Atualiza prazo total e dias passados
  useEffect(() => {
    if (dataInicio && dataFinal) {
      const inicio = new Date(dataInicio);
      const fim = new Date(dataFinal);
      const hoje = new Date();
      
      if (fim >= inicio) {
        const diffTotal = Math.ceil((fim - inicio) / (1000 * 60 * 60 * 24));
        setPrazo(diffTotal.toString());

        let diffPassados = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));
        if (diffPassados < 0) diffPassados = 0;          // Se hoje for antes do início
        if (diffPassados > diffTotal) diffPassados = diffTotal; // Limita ao prazo total
        
        setDiasPassados(diffPassados.toString());
      } else {
        setPrazo('');
        setDiasPassados('');
      }
    }
  }, [dataInicio, dataFinal]);

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

  return (
    <section className="container">
      <TituloH3 value='Cadastrar Nova Obra' />
      <div className="inputs-cadastro-obra pages-section-background">
        <h4>Dados do Proprietário</h4>
        <InputForm className='duas-colunas' label="Nome do Proprietário *" value={proprietario} required onChange={(e) => setProprietario(e.target.value)} />
        <InputForm className='uma-coluna' label="Contato do Proprietário" value={contatoProprietario} onChange={(e) => setContatoProprietario(e.target.value)} />

        <h4>Dados da Obra</h4>
        <InputForm className='tres-colunas' label="Nome da Obra *" value={nomeObra} required onChange={(e) => setNomeObra(e.target.value)} />
        <InputForm className='uma-coluna' label="CEP *" value={cep} maxLength={8} required onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))} />
        <InputForm className='duas-colunas' label="Rua *" value={rua} required onChange={(e) => setRua(e.target.value)} />
        <InputForm className='duas-colunas' label="Bairro *" value={bairro} required onChange={(e) => setBairro(e.target.value)} />
        <InputForm className='uma-coluna' label="Cidade *" value={cidade} required onChange={(e) => setCidade(e.target.value)} />
        <InputForm className='uma-coluna' label="Número *" value={numero} required onChange={(e) => setNumero(e.target.value)} />
        <InputForm className='duas-colunas' label="Complemento" value={complemento} onChange={(e) => setComplemento(e.target.value)} />

        <h4>Cronograma</h4>
        <InputForm className='uma-coluna' label="Data Início *" type="date" value={dataInicio} required onChange={(e) => setDataInicio(e.target.value)} />
        <InputForm className='uma-coluna' label="Data Final *" type="date" value={dataFinal} required onChange={(e) => setDataFinal(e.target.value)} />
        
        <InputForm
          className='uma-coluna'
          label="Prazo Atual/Estimado (dias) *"
          value={diasPassados && prazo ? `${diasPassados} / ${prazo}` : ''}
          readOnly
          required
        />

        <InputForm className='tres-colunas text-area' type='textarea' label="Observações" value={observacao} onChange={(e) => setObservacao(e.target.value)} />

        <button className="botao-retangular cancelar" onClick={cancelar}>Cancelar</button>
        <div></div>
        <button className="botao-retangular seguir" onClick={seguir}>Continuar</button>
      </div>
    </section>
  );
}

export default CadastroObra;
