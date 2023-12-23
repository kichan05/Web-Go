import "./initial.css"
import './App.css';
import {useEffect, useState} from "react";

function App() {
  const [map, setMap] = useState(Array(19).fill(Array(19).fill(0)))
  const [turn, setTurn] = useState(0)

  useEffect(() => {
    console.log(map)
  }, [map])

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
        name={`(${x}, ${y})`}
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
    if(map[y][x] !== 0)
      return

    setMap(map.map((row, i) => (
      i !== y ? row : row.map((col, j) => (
        j !== x ? col : player
      ))
    )))
    setTurn(turn + 1)
  }

  return (
    <div className="App">
      <div className="go-wrap" style={{
        width: cellStyle.width * 19,
        height: cellStyle.height * 19,
      }}>
        <div className="cell-wrap">
          {map.map((row, y) => (
            <>
              {row.map((col, x) => (
                <Cell
                  key={x}
                  x={x}
                  y={y}
                  value={col}
                  onClick={() => {
                    handleCellClick(x, y, turn % 2 + 1)
                  }}/>
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
    </div>
  );
}

export default App;
