import './RoundPieChart.scss';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const CustomTooltip = ({ active, payload, coordinate }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    // coordinate содержит { x, y } курсора
    return (
      <div style={{
        position: 'absolute',
        left: coordinate.x - 50, // смещение по горизонтали
        top: coordinate.y - 60,   // смещение вверх
        backgroundColor: '#fff',
        padding: '10px 15px',
        borderRadius: '10px',
        color: '#000',
        border: '1px solid #000',
        pointerEvents: 'none', // чтобы тултип не блокировал курсор
      }}>
        <p style={{ margin: 0 }}>{data.name}</p>
        <p style={{ margin: 0, fontWeight: 'bold' }}>{data.value}</p>
        <div className="triangle"></div>
      </div>
    );
  }
  return null;
};

export const PieWithCustomTooltip = () => (
  <PieChart width={400} height={400}>
<Pie
  data={[
    { name: 'A', value: 400 },
    { name: 'B', value: 300 },
  ]}
  dataKey="value"
  cx="50%"
  cy="50%"
  outerRadius={100}   // внешний радиус
  innerRadius={60}    // внутренний радиус — делает центр пустым
  fill="#8884d8"
>
      <Cell fill="#0088FE" />
      <Cell fill="#00C49F" />
    </Pie>
    <Tooltip content={<CustomTooltip />} />
  </PieChart>
);
