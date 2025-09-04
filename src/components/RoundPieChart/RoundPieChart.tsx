import "./RoundPieChart.scss";
import { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import type { Data } from "../../App";


const COLORS = ["#0088FE", "#00C49F", "#3f2cbaff", "#8ca42aff", "#ff7300", "#8884d8"];

const CustomTooltip = ({ active, payload, coordinate }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        className="custom-tooltip"
        style={{ left: coordinate.x - 50, top: coordinate.y - 60 }}
      >
        <p className="tooltip-name">{data.name}</p>
        <p className="tooltip-value">{data.value.toFixed(2)}%</p>
        <div className="triangle"></div>
      </div>
    );
  }
  return null;
};

export const PieWithLegend: React.FC<{ data: Data[] }> = ({ data }) => {
  const [hover, setHover] = useState(false);

  const chartData = data.map((d, index) => ({
    name: d.holder,
    value: d.share_percent,
    color: COLORS[index % COLORS.length],
  }));

  const adjustedData = chartData.map((d) => ({
    ...d,
    value: d.value + 0.0001, // чтобы убрать зазор
  }));

  return (
    <div className="pie-with-legend">
      <PieChart width={350} height={350}>
        <Pie
          data={adjustedData}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={120}
          innerRadius={75}
          paddingAngle={0}
          cornerRadius={0}
          stroke="none"
          startAngle={90}
          endAngle={450}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {adjustedData.map((entry) => (
            <Cell
              key={entry.name}
              fill={entry.color}
              opacity={hover ? 0.3 : 1}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>

      <div className="legend">
        {chartData.map((entry) => (
          <div key={entry.name} className="legend-item">
            <div className="legend-item-row">
              <div
                className="legend-color"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="legend-text">{entry.name}</span>
            </div>
            <div className="br"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
