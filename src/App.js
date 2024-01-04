import "./initial.css"
import './App.css';
import {useState} from "react";
import produce from "immer";
import {LogList} from "./component/LogList";
import {MapLine} from "./component/MapLine";
import {MapCell} from "./component/MapCell";

export const emptyArray = Array(19).fill(0)
export function getTowDomEmptyArray() {
  return Array(19).fill(Array(19).fill(0))
}

function App() {
  const [map, setMap] = useState(getTowDomEmptyArray())
  const [turn, setTurn] = useState(1)
  const [log, setLog] = useState([])

  const handleCellClick = (x, y, player) => {
    if (map[y][x] !== 0)
      return

    setMap(produce(map, draft => {
      draft[y][x] = player
    }))
  }

  return (
    <div className="App">
      <div className="go-wrap">
        <MapCell map={map} handleCellClick={handleCellClick} turn={turn}/>
        <MapLine/>
      </div>
      <button onClick={() => {
        setMap(getTowDomEmptyArray())
        // setTurn(1)
        setLog([])
      }}>리셋
      </button>

      <button onClick={() => setTurn(1)}>흑</button>
      <button onClick={() => setTurn(2)}>백</button>
      <LogList log={log}/>
    </div>
  );
}

export default App;
