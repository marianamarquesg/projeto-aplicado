import { useState, useEffect } from 'react';
import TituloH3 from '../../components/Titulos/TituloH3';
import './CadastroEtapas.css';
import InputForm from '../../components/Formulario/InputForm';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faSquareCaretDown, faSquareCaretUp } from '@fortawesome/free-regular-svg-icons';

function CadastroEtapas() {
  const navigate = useNavigate();
  const [obra, setObra] = useState(null);
  const [etapas, setEtapas] = useState([]);
  const [etapasExpandidas, setEtapasExpandidas] = useState([]);

  useEffect(() => {
    const initialEtapas = [
      { nome: 'Pintura', descricao: '', prazo: '', dataInicio: '', dataFim: '' },
      { nome: 'Alvenaria', descricao: '', prazo: '', dataInicio: '', dataFim: '' },
      { nome: 'Elétrica', descricao: '', prazo: '', dataInicio: '', dataFim: '' },
      { nome: 'Hidráulica', descricao: '', prazo: '', dataInicio: '', dataFim: '' },
      { nome: 'Esquadrias', descricao: '', prazo: '', dataInicio: '', dataFim: '' },
      { nome: 'Louças', descricao: '', prazo: '', dataInicio: '', dataFim: '' },
      { nome: 'Revestimentos', descricao: '', prazo: '', dataInicio: '', dataFim: '' },
      { nome: 'Gesso', descricao: '', prazo: '', dataInicio: '', dataFim: '' },
      { nome: 'Piso', descricao: '', prazo: '', dataInicio: '', dataFim: '' }
    ];

    const obraStorage = JSON.parse(localStorage.getItem('obraEmAndamento'));
    let etapasStorage = JSON.parse(localStorage.getItem('etapas'));

    if (!obraStorage) {
      navigate('/cadastroObra');
      return;
    }

    setObra(obraStorage);

    if (!etapasStorage || etapasStorage.length === 0) {
      etapasStorage = initialEtapas;
      localStorage.setItem('etapas', JSON.stringify(etapasStorage));
    }

    setEtapas(etapasStorage);
  }, [navigate]);

  const toggleExpandir = (index) => {
    setEtapasExpandidas(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const atualizarCampo = (index, campo, valor) => {
    const novas = [...etapas];
    novas[index] = { ...novas[index], [campo]: valor };

    const { dataInicio, dataFim } = novas[index];
    if (dataInicio && dataFim && new Date(dataFim) >= new Date(dataInicio)) {
      const diff = Math.ceil((new Date(dataFim) - new Date(dataInicio)) / (1000 * 60 * 60 * 24));
      novas[index].prazo = diff.toString();
    } else {
      novas[index].prazo = '';
    }

    setEtapas(novas);
    localStorage.setItem('etapas', JSON.stringify(novas));
  };

  const adicionarEtapa = () => {
    const existeVazia = etapas.some(etapa =>
      !etapa.nome && !etapa.descricao && !etapa.prazo && !etapa.dataInicio && !etapa.dataFim
    );
    if (existeVazia) {
      alert('Preencha ou exclua a etapa em branco antes de adicionar uma nova.');
      return;
    }
    const nova = { nome: '', descricao: '', prazo: '', dataInicio: '', dataFim: '' };
    const novas = [nova, ...etapas];
    setEtapas(novas);
    setEtapasExpandidas(prev => [0, ...prev.map(i => i + 1)]);
    localStorage.setItem('etapas', JSON.stringify(novas));
  };

  const removerEtapa = (index) => {
    const novas = etapas.filter((_, i) => i !== index);
    setEtapas(novas);
    localStorage.setItem('etapas', JSON.stringify(novas));
    setEtapasExpandidas(prev => prev.filter(i => i !== index).map(i => (i > index ? i - 1 : i)));
  };

  const salvarTudo = () => {
    const camposInvalidos = etapas.some(etapa =>
      !etapa.nome || !etapa.descricao || !etapa.prazo || !etapa.dataInicio || !etapa.dataFim
    );
    if (camposInvalidos) {
      alert('Preencha todos os campos obrigatórios antes de salvar.');
      return;
    }

    const datasInvalidas = etapas.some(etapa => {
      const inicio = new Date(etapa.dataInicio);
      const fim = new Date(etapa.dataFim);
      return fim < inicio;
    });
    if (datasInvalidas) {
      alert('A Data Fim não pode ser menor que a Data Início em nenhuma etapa.');
      return;
    }

    if (!obra) {
      alert('Dados da obra não encontrados. Volte e cadastre a obra novamente.');
      navigate('/cadastroObra');
      return;
    }

    const obraCompleta = { ...obra, etapas };

    // Pega as obras já salvas (array)
    let obrasSalvas = JSON.parse(localStorage.getItem('obrasSalvas')) || [];

    // Adiciona a nova obra completa (etapas + obra) ao array
    obrasSalvas.push(obraCompleta);

    // Salva no localStorage
    localStorage.setItem('obrasSalvas', JSON.stringify(obrasSalvas));

    // Remove dados temporários da obra em andamento e etapas
    localStorage.removeItem('obraEmAndamento');
    localStorage.removeItem('etapas');

    navigate('/obras');
  };

  return (
    <section className="container">
      <TituloH3 value="Cadastro de Etapas da Obra" />
      <div className="pages-section-background">
        <div className='adicionar-etapa'>
          <button className="botao-retangular" onClick={adicionarEtapa}>
            + Nova Etapa
          </button>
        </div>
        <ul className="lista-etapas">
          {etapas.map((etapa, index) => (
            <li key={index} className="etapa-item">
              <div className="linha-etapa">
                <span>{etapa.nome || 'Etapa sem nome'}</span>
                <div className="acoes-etapa">
                  <button
                    className="icone-botao"
                    title="Remover etapa"
                    onClick={() => removerEtapa(index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} size="lg" />
                  </button>
                  <button
                    className="icone-botao"
                    title="Expandir etapa"
                    onClick={() => toggleExpandir(index)}
                  >
                    <FontAwesomeIcon icon={etapasExpandidas.includes(index) ? faSquareCaretUp : faSquareCaretDown} size="lg" />
                  </button>
                </div>
              </div>
              {etapasExpandidas.includes(index) && (
                <div className="detalhes-etapa">
                  {etapa.dataInicio && etapa.dataFim && new Date(etapa.dataFim) < new Date(etapa.dataInicio) && (
                    <p className="erro-validacao">Data Fim não pode ser menor que Data Início</p>
                  )}
                  <InputForm
                    className={`uma-coluna ${!etapa.nome ? 'input-com-erro' : ''}`}
                    label="Nome da Etapa *"
                    value={etapa.nome}
                    required
                    onChange={e => atualizarCampo(index, 'nome', e.target.value)}
                  />
                  <InputForm
                    className="duas-colunas"
                    type="textarea"
                    label="Descrição *"
                    value={etapa.descricao}
                    required
                    onChange={e => atualizarCampo(index, 'descricao', e.target.value)}
                  />
                  <InputForm
                    className="uma-coluna"
                    label="Prazo (dias)"
                    type="number"
                    value={etapa.prazo}
                    required
                    readOnly
                  />
                  <InputForm
                    className="uma-coluna"
                    label="Data Início *"
                    type="date"
                    value={etapa.dataInicio}
                    required
                    onChange={e => atualizarCampo(index, 'dataInicio', e.target.value)}
                  />
                  <InputForm
                    className="uma-coluna"
                    label="Data Fim *"
                    type="date"
                    value={etapa.dataFim}
                    required
                    onChange={e => atualizarCampo(index, 'dataFim', e.target.value)}
                  />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="botoes-acoes">
        <button className="botao-retangular cancelar" onClick={() => navigate('/cadastroObra')}>
          Voltar
        </button>
        <button className="botao-retangular seguir" onClick={salvarTudo}>
          Salvar
        </button>
      </div>
    </section>
  );
}

export default CadastroEtapas;
