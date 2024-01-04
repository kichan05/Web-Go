import {Cell} from "./Cell";

export const MapCell = ({map, handleCellClick, turn}) => {
  return (
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
  )
}