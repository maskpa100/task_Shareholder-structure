import { useEffect, useState } from "react";
import axios from "axios";
import './App.css'
import dataJson from "./../public/api/data.json";
import { StocksTable } from "./components/StocksTable/Table";
import { PieWithLegend } from "./components/RoundPieChart/RoundPieChart";

export interface Data {
  holder: string;
  share_percent: number;
}

function App() {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get("/fake-endpoint", {
        // подменяем запрос — берём данные из data.json
adapter: async (config) => {
  return {
    data: dataJson,
    status: 200,
    statusText: "OK",
    headers: {},
    config, // обязательное поле правильного типа
  };
}

      });

      const raw = response.data.SBER;

      // объединяем дубликаты
      const merged: Record<string, number> = {};
      raw.forEach((item: { holder: string; share_percent: string }) => {
        const percent = parseFloat(item.share_percent);
        merged[item.holder] = (merged[item.holder] || 0) + percent;
      });

      let arr: Data[] = Object.entries(merged).map(([holder, percent]) => ({
        holder,
        share_percent: percent,
      }));

      // нормализуем до 100%
      const total = arr.reduce((sum, i) => sum + i.share_percent, 0);
      arr = arr.map((i) => ({
        ...i,
        share_percent: (i.share_percent / total) * 100,
      }));

      setData(arr);
    };

    loadData();
  }, []);

  return (
    <div className="app">
      <StocksTable data={data} />
      <PieWithLegend data={data} />
    </div>
  );
}

export default App;
