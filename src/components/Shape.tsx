import { useState, ChangeEvent, ChangeEventHandler, useEffect } from "react";
export interface Size {
  triangle: number;
  circle: number;
  square: number;
}
export type Color = {
  triangle: string;
  circle: string;
  square: string;
};
type Props = {
  stateColors: any;
  shape: string;
  size: Size;
  handleChange: ChangeEventHandler;
};

// Mejor crear 3 componentes Triangle, Circle y Square
// Usar SVG para las formas como componentes React
// Validar las props
const Shape = ({
  stateColors: [globalColors, setGlobalcolors],
  shape,
  size,
  handleChange,
}: Props) => {
  const [color, setColor] = useState(asignColor(shape));
  const { triangle, circle, square } = size;

  // Declararlo fuera, o usar styled-components, pero no es necesario para el ejercicio.
  const divStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    marginBottom: "3rem",
  };

  // Al escoger una estrategia por CSS y agrupar todo en un componente demasiado generico te ves obligado al código que tienes aquí.
  const triangleStyles = {
    width: 0,
    height: 0,
    borderLeft: `${triangle / 2}px solid transparent`,
    borderRight: `${triangle / 2}px solid transparent`,
    borderBottom: `${triangle}px solid ${color}`,
    marginTop: "1rem",
  };
  const circleStyle = {
    height: `${circle}px`,
    width: `${circle}px`,
    backgroundColor: `${color}`,
    borderRadius: "50%",
  };
  const squareStyle = {
    height: `${square}px`,
    width: `${square}px`,
    backgroundColor: `${color}`,
  };

  useEffect(() => {
    const global_color = { [shape]: color };
    const { triangle, circle, square } = globalColors;
    if (triangle === circle && circle === square)
      alert("los tres tiene el mismo color");
    setGlobalcolors((prev: Color) => ({ ...prev, ...global_color }));
  }, [color]);

  function asignColor(shape: string): string {
    const { triangle, circle, square } = globalColors;
    return shape == "triangle" ? triangle : shape == "circle" ? circle : square;
  }

  const handleColor = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>): void => setColor(value);

  const shapeStyle =
    shape == "triangle"
      ? triangleStyles
      : shape == "circle"
      ? circleStyle
      : squareStyle;

  return (
    <div style={divStyle}>
      <div>
        {/* No tiene etiqueta de accecsibilidad */}
        <label>Elige un color:</label>
        {/* No tiene ID o name */}
        <input onChange={handleColor} type="color" value={color} />
      </div>
      <div>
        <label>Elige el tamaño:</label>
        <input name={shape} onChange={handleChange} type="number" />
      </div>
      <div style={shapeStyle}></div>
    </div>
  );
};
export default Shape;
