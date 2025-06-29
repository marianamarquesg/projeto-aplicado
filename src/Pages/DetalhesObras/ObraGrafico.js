import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function ObraGrafico({ obra }) {
  const data = [
    { name: 'Prazo', date: new Date(obra.prazo).getTime() },
    { name: 'Data Final', date: new Date(obra.dataFinal).getTime() }
  ];

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>Prazo Planejado vs Data Final</h2>
      <BarChart width={300} height={250} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis domain={['auto', 'auto']} tickFormatter={(tick) => new Date(tick).toLocaleDateString()} />
        <Tooltip labelFormatter={(label) => label} formatter={(value) => new Date(value).toLocaleDateString()} />
        <Bar dataKey="date" fill="#0a9396" />
      </BarChart>
    </div>
  );
}


