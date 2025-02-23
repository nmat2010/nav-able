import { useState } from "react"
// import EyeTracking from "./components/EyeTracking";
import './App.css'
import Home from "./components/Home";

function App() {
  const [clickCount, setClickCount] = useState(0);

  return (
    <>
      <Home/>
    </>
  )
}

export default App
