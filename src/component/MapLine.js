import {Line} from "./Line";
import {emptyArray} from "../App";

export const MapLine = () => {
  return (
    <div className="line-wrap">
      {emptyArray.map((_, x) => (
        <Line isVertical index={x}/>
      ))}
      {emptyArray.map((_, x) => (
        <Line isVertical={false} index={x}/>
      ))}
    </div>
  )
}