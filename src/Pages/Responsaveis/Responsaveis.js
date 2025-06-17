import { useState } from 'react';
import './Responsaveis.css';

function Responsaveis() {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('Todas');

  const responsaveis = [
    {
      nome: 'Eng. João Silva',
      cpf: '123.456.789-00',
      obras: ['Reforma da Escola Municipal', 'Construção do Centro Cultural', 'Ponte do Bairro Alto'],
      telefone: '(11) 91234-5678',
      email: 'joao.silva@engenharia.com'
    },
    {
      nome: 'Arq. Marina Costa',
      cpf: '234.567.890-11',
      obras: ['Construção do Posto de Saúde', 'Revitalização da Praça Central', 'Reforma do Prédio Administrativo'],
      telefone: '(21) 99876-5432',
      email: 'marina.costa@arquitetura.com'
    },
    {
      nome: 'Eng. Carlos Lima',
      cpf: '345.678.901-22',
      obras: ['Duplicação da Avenida Central', 'Estação de Tratamento de Água', 'Nova Passarela da BR-101'],
      telefone: '(31) 98765-4321',
      email: 'carlos.lima@infraestrutura.com'
    },
    {
      nome: 'Eng. Ana Ribeiro',
      cpf: '456.789.012-33',
      obras: ['Obra da Praça do Bairro', 'Calçamento da Rua das Flores', 'Cobertura da Quadra Escolar'],
      telefone: '(41) 99654-3210',
      email: 'ana.ribeiro@obrasmunicipais.com'
    },
    {
      nome: 'Eng. Rodrigo Melo',
      cpf: '567.890.123-44',
      obras: ['Construção de Creche Municipal', 'Reparo de Drenagem Urbana', 'Ampliação do Ginásio Poliesportivo'],
      telefone: '(51) 99543-2109',
      email: 'rodrigo.melo@prefeitura.com'
    }
  ];
  

  const responsavelFiltrado = responsaveis.filter((responsavel) => {
    const combinaStatus = filtro === 'Todas' || responsavel.nome === filtro;
    const combinaBusca = responsavel.nome.toLowerCase().includes(busca.toLowerCase());
    return combinaStatus && combinaBusca;
  });


  return (
    <section id='obras-section'>
        <section id='filtro-obras'>
            <nav>
              <h2 className='titulo-responsaveis'>Responsáveis Cadastrados</h2>
                <input class='input-buscar'
                type='text'
                placeholder='Buscar Responsável...'
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                />
                <button class='botao-retangular'>Adicionar Responsável</button>
            </nav>
        </section>
        

        <ul id="lista-obras">
  <li className="cabecalho-tabela">
    <p className="col col-nome">Nome do responsável</p>
    <p className="col col-cpf">cpf</p>
    <p className="col col-obras">obras</p>
    <p className="col col-telefone">telefone</p>
    <p className="col col-email">email</p>
    <p className="col col-acoes">ações</p>

  </li>

  {responsavelFiltrado.length > 0 ? (
    responsavelFiltrado.map((responsavel, index) => (
      <li className="item-lista" key={index}>
        <p className="col col-nome">{responsavel.nome}</p>
        <p className="col col-responsavel">{responsavel.cpf}</p>
        <p className="col col-prazo">{responsavel.obras.length}</p>
        <p className="col col-final">{responsavel.telefone || '—'}</p>
        <p className="col col-final">{responsavel.email || '—'}</p>
        <p className="col col-final">{responsavel.acoes || '—'}</p>
      </li>
    ))
  ) : (
    <li className="item-lista">Nenhum responsável encontrado.</li>
  )}
</ul>
    </section>
  );
}

export default Responsaveis;
