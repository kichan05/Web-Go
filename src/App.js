import "./initial.css"
import './App.css';
import {useEffect, useState} from "react";
import produce from "immer";

function App() {
  const [map, setMap] = useState(Array(19).fill(Array(19).fill(0)))
  const [turn, setTurn] = useState(1)

  const cellStyle = {
    width: 30,
    height: 30,
    fontSize: 7,
  }
  const lineStyle = {
    stroke: 2
  }

  const Cell = ({x, y, value, ...rest}) => {
    return (
      <div
        style={cellStyle}
        className="cell"
        {...rest}
      >
        <div
          className={value === 0 ? "none" : value === 1 ? "black" : "white"}></div>
      </div>
    )
  }

  const handleCellClick = (x, y, player) => {
    if (map[y][x] !== 0)
      return

    setMap(produce(map, draft => {
      draft[y][x] = player
    }))
  }

  const [log, setLog] = useState([])

  return (
    <div className="App">
      <div className="go-wrap">
        <div className="cell-wrap">
          {map.map((row, y) => (
            <>
              {row.map((col, x) => (
                <Cell
                  key={x} x={x} y={y} value={col}
                  onClick={() => handleCellClick(x, y, turn)}/>
              ))}
            </>
          ))}
        </div>

        <div className="line-wrap">
          {Array(19).fill(0).map((_, x) => (
            <div
              key={x}
              style={{
                width: cellStyle.width * 18 + lineStyle.stroke,
                height: lineStyle.stroke,
                backgroundColor: "#000",
                top: cellStyle.height * x + cellStyle.height / 2,
                left: cellStyle.width / 2
              }}></div>
          ))}
          {Array(19).fill(0).map((_, x) => (
            <div
              key={x}
              style={{
                width: lineStyle.stroke,
                height: cellStyle.height * 18 + lineStyle.stroke,
                backgroundColor: "#000",
                top: cellStyle.height / 2,
                left: cellStyle.width * x + cellStyle.width / 2
              }}></div>
          ))}
        </div>
      </div>
      <button onClick={() => {
        setMap(Array(19).fill(Array(19).fill(0)))
        setTurn(0)
        setLog([])
      }}>리셋</button>

      <button onClick={() => {setTurn(1)}}>흑</button>
      <button onClick={() => {setTurn(2)}}>백</button>
      <ul>
        {log.map((i, index) => (
          <li>{index}. {i}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
