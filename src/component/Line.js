import {cellStyle, lineStyle} from "../style";

export const Line = ({index, isVertical}) => {
  const length = cellStyle.width * 18 + lineStyle.stroke
  const position = cellStyle.width * index + cellStyle.width / 2

  return (
    <div
      style={{
        width: isVertical ? length : lineStyle.stroke,
        height: isVertical ? lineStyle.stroke : length,
        backgroundColor: "#000",
        top: isVertical ? position : cellStyle.width / 2,
        left: isVertical ? cellStyle.width / 2 : position
      }}></div>
  )
}