export default function ObraInfo({ obra }) {
  return (
    <div>
      <h1>Detalhes da Obra</h1>
      <p><strong>Nome:</strong> {obra.nome}</p>
      <p><strong>Responsável:</strong> {obra.responsavel}</p>
      <p><strong>Status:</strong> {obra.status}</p>
      <p><strong>Prazo:</strong> {obra.prazo}</p>
      <p><strong>Data Final:</strong> {obra.dataFinal}</p>
    </div>
  );
}
