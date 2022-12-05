import { useState, ChangeEvent, ChangeEventHandler, useEffect } from "react"
export interface Size {
  triangle: number
  circle: number
  square: number
}
export type Color = {
  triangle: string
  circle: string
  square: string
}
type Props = {
  stateColors: any
  shape: string
  size: Size
  colorProp?: string
  handleChange: ChangeEventHandler
}

const Shape = ({
  stateColors: [globalColors, setGlobalcolors],
  shape,
  size,
  colorProp,
  handleChange,
}: Props) => {
  const [color, setColor] = useState(colorProp)
  const { triangle, circle, square } = size

  const divStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    marginBottom: "3rem",
  }
  const triangleStyles = {
    width: 0,
    height: 0,
    borderLeft: `${triangle / 2}px solid transparent`,
    borderRight: `${triangle / 2}px solid transparent`,
    borderBottom: `${triangle}px solid ${color}`,
    marginTop: "1rem",
  }
  const circleStyle = {
    height: `${circle}px`,
    width: `${circle}px`,
    backgroundColor: `${color}`,
    borderRadius: "50%",
  }
  const squareStyle = {
    height: `${square}px`,
    width: `${square}px`,
    backgroundColor: `${color}`,
  }

  useEffect(() => {
    const global_color = { [shape]: color }
    const { triangle, circle, square } = globalColors
    if (triangle === circle && circle === square)
    // if (triangle === circle && circle === square && square === triangle)
      console.log("los tres tiene el mismo color")
    setGlobalcolors((prev: Color) => ({ ...prev, ...global_color }))
  }, [color])

  const asignColor = (shape: string): string => {
    const { triangle, circle, square } = globalColors
    return shape == "triangle" ? triangle : shape == "circle" ? circle : square
  }

  const handleColor = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => setColor(value)

  const shapeStyle =
    shape == "triangle"
      ? triangleStyles
      : shape == "circle"
      ? circleStyle
      : squareStyle

  return (
    <div style={divStyle}>
      <div>
        <label>Elige un color:</label>
        <input onChange={handleColor} type="color" value={asignColor(shape)} />
      </div>
      <div>
        <label>Elige el tamaño:</label>
        <input name={shape} onChange={handleChange} type="number" />
      </div>
      <div style={shapeStyle}></div>
    </div>
  )
}
export default Shape
