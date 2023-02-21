import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)
  const [run, setRun] = useState(false)
  const [btnText, setBtnText] = useState("Start")

  /* Time Count */
  useEffect(() => {
    const addSec = setInterval(() => {
    if (run) {
      setSecond(second + 1);
      if (second == 59) {
        setSecond(0);
        setMinute(minute + 1);
      }
      if (minute == 25) {
        setMinute(0);
        setSecond(0);
        setRun(false);
        setBtnText("Start");
      }
    }
  }, 1000);
  
  return () => clearInterval(addSec);
  });

  const startRun = () => {  
    if (run == false) {
      setRun(true);
      setBtnText("Pause")
    } else {
      setRun(false);
      setBtnText("Start")
    }
  };

  return (
    <div className="clock">
      <div>
        <h2>{minute.toString().padStart(2, '0')}:{second.toString().padStart(2, '0')}</h2>
      </div>
      <button onClick={startRun} id="startBTN">{btnText}</button>
    </div>
  )
}