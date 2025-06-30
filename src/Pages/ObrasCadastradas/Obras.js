import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import './Obras.css';

function Obras() {

  const obrasMockadas = [
  {
    id: 1,
    nome: 'Reforma da Escola Municipal',
    status: 'Em Andamento',
    responsavel: 'Eng. João Silva',
    dataInicio: '2025-04-01',
    prazo: '105',       // prazo total em dias
    dataFinal: '2025-07-15'
  },
  {
    id: 2,
    nome: 'Construção do Posto de Saúde',
    status: 'Finalizada',
    responsavel: 'Arq. Marina Costa',
    dataInicio: '2025-02-01',
    prazo: '120',
    dataFinal: '2025-05-30'
  },
  {
    id: 3,
    nome: 'Duplicação da Avenida Central',
    status: 'Atrasada',
    responsavel: 'Eng. Carlos Lima',
    dataInicio: '2025-03-15',
    prazo: '90',
    dataFinal: '2025-06-01'
  }
];


  const [filtro, setFiltro] = useState('Todas');
  const [busca, setBusca] = useState('');
  const [obras, setObras] = useState([]);

  useEffect(() => {
    const obrasSalvas = JSON.parse(localStorage.getItem('obrasSalvas')) || [];
    setObras([...obrasMockadas, ...obrasSalvas]);
  }, []);

  const calcularPrazoAtualEstimado = (dataInicioStr, prazoStr) => {
    if (!dataInicioStr || !prazoStr) return '—';

    const dataInicio = new Date(dataInicioStr);
    const prazoTotal = parseInt(prazoStr, 10);
    if (isNaN(prazoTotal)) return '—';

    const hoje = new Date();
    let diasPassados = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));
    if (diasPassados < 0) diasPassados = 0;
    if (diasPassados > prazoTotal) diasPassados = prazoTotal;

    return `${diasPassados} / ${prazoTotal}`;
  };

  const obrasFiltradas = obras.filter((obra) => {
    const combinaStatus = filtro === 'Todas' || obra.status === filtro;
    const combinaBusca = obra.nome.toLowerCase().includes(busca.toLowerCase());
    return combinaStatus && combinaBusca;
  });

  return (
    <section id='obras-section'>
      <section id='filtro-obras'>
        <nav>
          <div className='buttons-filtro'>
            <button className={filtro === 'Todas' ? 'active' : ''} onClick={() => setFiltro('Todas')}>Todas as Obras</button>
            <button className={filtro === 'Em Andamento' ? 'active' : ''} onClick={() => setFiltro('Em Andamento')}>Obras em Andamento</button>
            <button className={filtro === 'Finalizada' ? 'active' : ''} onClick={() => setFiltro('Finalizada')}>Obras Finalizadas</button>
            <button className={filtro === 'Atrasada' ? 'active' : ''} onClick={() => setFiltro('Atrasada')}>Obras Atrasadas</button>
          </div>

          <input
            className='input-buscar'
            type='text'
            placeholder='Buscar Obras...'
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <Link className='botao-retangular' to='/cadastroObra'>Criar Nova Obra</Link>
        </nav>
      </section>

      <ul id="lista-obras">
        <li className="cabecalho-tabela">
          <p className="col col-nome">Nome da obra</p>
          <p className="col col-prazo">Prazo atual/estimado</p>
          <p className="col col-final">Data final</p>
          <p className="col col-status">Status</p>
        </li>

        {obrasFiltradas.length > 0 ? (
          obrasFiltradas.map((obra, index) => (
            <li className="item-lista" key={index}>
              <Link to={`/detalhesObra/${obra.id || index}`} className="col col-nome">
                {obra.nome}
              </Link>
              <p className="col col-prazo">{calcularPrazoAtualEstimado(obra.dataInicio, obra.prazo)}</p>
              <p className="col col-final">{obra.dataFinal || '—'}</p>
              <div className={`col col-status tag-status ${obra.status?.replace(/\s+/g, '-').toLowerCase() || ''}`}>
                <p>{obra.status}</p>
              </div>
            </li>
          ))
        ) : (
          <li className="item-lista">Nenhuma obra encontrada.</li>
        )}
      </ul>
    </section>
  );
}

export default Obras;

