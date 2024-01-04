import {cellStyle} from "../style";

export const Cell = ({x, y, value, ...rest}) => {
  return (
    <div
      style={cellStyle}
      className="cell"
      {...rest}
    >
      <div
        className={value === 0 ? "none" : value === 1 ? "black" : "white"}>
      </div>
    </div>
  )
}