import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ObraGrafico({ obra }) {
  const dataInicio = new Date(obra.dataInicio || new Date()); 
  const dataPlanejada = new Date(dataInicio);
  dataPlanejada.setDate(dataPlanejada.getDate() + Number(obra.prazo));

  const dataFinal = new Date(obra.dataFinal);

  const data = [
    { name: 'Planejada', date: dataPlanejada.getTime() },
    { name: 'Data Final', date: dataFinal.getTime() }
  ];

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Prazo Planejado vs Data Final</h2>
      <BarChart width={300} height={250} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis
          domain={['auto', 'auto']}
          tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
        />
        <Tooltip
          labelFormatter={(label) => label}
          formatter={(value) => new Date(value).toLocaleDateString()}
        />
        <Bar dataKey="date" fill="#0a9396" />
      </BarChart>
    </div>
  );
}



