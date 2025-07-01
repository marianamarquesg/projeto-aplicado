import { useParams, Link } from 'react-router-dom';
import './DetalhesObras.css';
import ObraInfo from './ObraInfo';
import ObraGrafico from './ObraGrafico';

function DetalhesObra() {
  const { id } = useParams();


  const obrasFixas = [
    {
      id: 1,
      nome: 'Reforma da Escola Municipal',
      responsavel: 'Eng. João Silva',
      status: 'Em Andamento',
      prazo: '2025-07-15',
      dataFinal: '2025-05-28'
    },
    {
      id: 2,
      nome: 'Construção do Posto de Saúde',
      responsavel: 'Arq. Marina Costa',
      status: 'Finalizada',
      prazo: '2025-05-30',
      dataFinal: '2025-05-28'
    },
    {
      id: 3,
      nome: 'Duplicação da Avenida Central',
      responsavel: 'Eng. Carlos Lima',
      status: 'Atrasada',
      prazo: '2025-06-01',
      dataFinal: '2025-05-28'
    },
    {
      id: 4,
      nome: 'Obra da Praça do Bairro',
      responsavel: 'Eng. Ana Ribeiro',
      status: 'Finalizada',
      prazo: '2025-04-20',
      dataFinal: '2025-04-19'
    },
    {
      id: 5,
      nome: 'Construção de Creche Municipal',
      responsavel: 'Eng. Rodrigo Melo',
      status: 'Em Andamento',
      prazo: '2025-09-10',
      dataFinal: '2025-05-28'
    }
  ];


  const obrasSalvas = JSON.parse(localStorage.getItem('obrasSalvas')) || [];


  const todasObras = [...obrasFixas, ...obrasSalvas];

  const obra = todasObras.find((o) => String(o.id) === id);

  if (!obra) {
    return (
      <div className="container">
        <h2>Obra não encontrada</h2>
        <Link to="/obras" className="link-voltar">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <ObraInfo obra={obra} />
      <ObraGrafico obra={obra} />
      <br />
      <Link to="/obras" className="link-voltar">Voltar para lista</Link>
    </div>
  );
}

export default DetalhesObra;

