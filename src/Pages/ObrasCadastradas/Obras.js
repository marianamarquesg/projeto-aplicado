import { useState } from 'react';
import { Link } from "react-router-dom";

import './Obras.css';

function Obras() {
  const [filtro, setFiltro] = useState('Todas');
  const [busca, setBusca] = useState('');

  const obras = [
    {
      nome: 'Reforma da Escola Municipal',
      status: 'Em Andamento',
      responsavel: 'Eng. João Silva',
      prazo: '2025-07-15',
      dataFinal: '2025-05-28' 
    },
    {
      nome: 'Construção do Posto de Saúde',
      status: 'Finalizada',
      responsavel: 'Arq. Marina Costa',
      prazo: '2025-05-30',
      dataFinal: '2025-05-28'
    },
    {
      nome: 'Duplicação da Avenida Central',
      status: 'Atrasada',
      responsavel: 'Eng. Carlos Lima',
      prazo: '2025-06-01',
      dataFinal: '2025-05-28'
    },
    {
      nome: 'Obra da Praça do Bairro',
      status: 'Finalizada',
      responsavel: 'Eng. Ana Ribeiro',
      prazo: '2025-04-20',
      dataFinal: '2025-04-19'
    },
    {
      nome: 'Construção de Creche Municipal',
      status: 'Em Andamento',
      responsavel: 'Eng. Rodrigo Melo',
      prazo: '2025-09-10',
      dataFinal: '2025-05-28'
    }
  ];
  

  const obrasFiltradas = obras.filter((obra) => {
    const combinaStatus = filtro === 'Todas' || obra.status === filtro;
    const combinaBusca = obra.nome.toLowerCase().includes(busca.toLowerCase());
    return combinaStatus && combinaBusca;
  });

  return (
    <section id='obras-section'>
        <section id='filtro-obras'>
            <nav>
                <div class='buttons-filtro'>
                    <button className={filtro === 'Todas' ? 'active' : ''} onClick={() => setFiltro('Todas')}>Todas as Obras</button>
                    <button className={filtro === 'Em Andamento' ? 'active' : ''} onClick={() => setFiltro('Em Andamento')}>Obras em Andamento</button>
                    <button className={filtro === 'Finalizada' ? 'active' : ''} onClick={() => setFiltro('Finalizada')}>Obras Finalizadas</button>
                    <button className={filtro === 'Atrasada' ? 'active' : ''} onClick={() => setFiltro('Atrasada')}>Obras Atrasadas</button>
                </div>
               
                <input class='input-buscar'
                type='text'
                placeholder='Buscar Obras...'
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                />
                <Link class='botao-retangular' to='/cadastroObra'>Criar Nova Obra</Link>

            </nav>
        </section>
        

        <ul id="lista-obras">
        <li className="cabecalho-tabela">
            <p className="col col-nome">Nome da obra</p>
            {/* <p className="col col-responsavel">Responsável Técnico</p> */}
            <p className="col col-prazo">Prazo atual/estimado</p>
            <p className="col col-final">Data final</p>
            <p className="col col-status">Status</p>
        </li>

  {obrasFiltradas.length > 0 ? (
    obrasFiltradas.map((obra, index) => (
      <li className="item-lista" key={index}>
        <p className="col col-nome">{obra.nome}</p>
        {/* <p className="col col-responsavel">{obra.responsavel}</p> */}
        <p className="col col-prazo">{obra.prazo}</p>
        <p className="col col-final">{obra.dataFinal || '—'}</p>
        <div className={`col col-status tag-status ${obra.status.replace(/\s+/g, '-').toLowerCase()}`}>
            <p >{obra.status}</p>
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
