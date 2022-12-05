import { ChangeEvent, useEffect, useState } from "react";
import "./App.css";
import Shape, { Size, Color } from "./components/Shape";

function App() {
  const initialSize: Size = {
    triangle: 70,
    circle: 60,
    square: 30
  }
  const initialColor: Color = {
    triangle: '#555caca',
    circle: '#554040',
    square: '#555222'
  }
  const [size, setSize] = useState<Size>(initialSize)
  const [globalColors, setGlobalcolors] = useState<Color>(initialColor)
  useEffect(() => {
    console.log(size)
    console.log(globalColors)
    const { triangle, circle, square } = size
    if (triangle === circle && circle === square) alert('los tres tiene el mismo tamaño')

  }, [size])

  const handleSize = ({ target: { value, name } }: ChangeEvent<HTMLInputElement>): void => {
    console.log(name, value)
    let newState = { [name]: +value }
    newState = { ...newState }
    setSize((prev: Size) => ({ ...prev, ...newState }))
  }
  return (
    <div className="App">
      <Shape stateColors={[globalColors,setGlobalcolors]}  shape='triangle' size={size} handleChange={handleSize} />
      <Shape stateColors={[globalColors,setGlobalcolors]} shape='circle' size={size} handleChange={handleSize} />
      <Shape stateColors={[globalColors,setGlobalcolors]} shape='square' size={size} handleChange={handleSize} />
    </div>
  );
}

export default App;
