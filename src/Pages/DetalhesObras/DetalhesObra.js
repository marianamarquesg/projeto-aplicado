import { useParams, Link } from 'react-router-dom';
import './DetalhesObras.css';

function DetalhesObra() {
  const { id } = useParams();

  // Simulando os dados (mesma lista com id)
  const obras = [
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

  // Procurar a obra pelo id
  const obra = obras.find((o) => o.id === parseInt(id));

  if (!obra) {
    return (
      <div className="container">
        <h2>Obra não encontrada</h2>
        <Link to="/" className="link-voltar">Voltar</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Detalhes da Obra</h1>
      <p><strong>Nome:</strong> {obra.nome}</p>
      <p><strong>Responsável:</strong> {obra.responsavel}</p>
      <p><strong>Status:</strong> {obra.status}</p>
      <p><strong>Prazo:</strong> {obra.prazo}</p>
      <p><strong>Data Final:</strong> {obra.dataFinal}</p>
      <br />
      <Link to="/" className="link-voltar">Voltar para lista</Link>
    </div>
  );
}

export default DetalhesObra;

