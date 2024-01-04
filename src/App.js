import "./initial.css"
import './App.css';
import {useEffect, useState} from "react";

let _bfs = Array(19).fill(Array(19).fill(0))
const bfs = (x, y, map) => {
  if(_bfs[y][x] === 1)
    return
  _bfs[y][x] = 1

  console.log("bfs", x, y)

  for(let dy = -1; dy <= 1; dy += 1){
    for(let dx = -1; dx <= 1; dx += 1){
      if(Math.abs(dx + dy) !== 1)
        continue


      const [nx, ny] = [x + dx, y + dy]
      if(nx < 0 || nx >= 19 || ny < 0 || ny >= 19)
        continue

      console.log(nx, ny, "체크")

      if(map[ny][nx] === 0){
        console.log("비었음")
        return true
      }

      if(map[ny][nx] === map[y][x] && bfs(nx, ny, map)){
        console.log("같은편인데 비었음")
        return true
      }
    }
  }

  return false
}

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
  const pointStyle = {
    width: 10,
    height: 10,
    borderRadius: "100%"
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

    let newMap = map.map(row => [...row])
    newMap[y][x] = player

    for(let y = 0; y < 19; y++){
      for(let x = 0; x < 19; x++){
        if(newMap[y][x] === 0)
          continue

        _bfs = Array(19).fill(Array(19).fill(0))
        if(!bfs(x, y, newMap)){
          if(newMap[y][x] === 1)
            setLog([...log, "흑 잡음"])
          if(newMap[y][x] === 2)
            setLog([...log, "백 잡음"])
          newMap[y][x] = 0
        }
      }
    }
    setMap(newMap)
    // setTurn(turn + 1)
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
                  key={x}
                  x={x}
                  y={y}
                  value={col}
                  onClick={() => {
                    handleCellClick(x, y, turn)
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
