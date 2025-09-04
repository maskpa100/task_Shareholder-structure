import { PieWithCustomTooltip } from "./components/RoundPieChart/RoundPieChart";
import { StocksTable } from "./components/Table";


function App() {
  return (
    <div style={{ margin: "20px" }}>
      <StocksTable />
      <PieWithCustomTooltip/>
    </div>
  );
}

export default App;
