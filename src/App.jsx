import { useEffect, useState } from 'react';
import './App.css';
import Modal from './components/Modal';

export default function App() {
  /* hooks */
  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)
  const [run, setRun] = useState(false)
  const [btnText, setBtnText] = useState("Start")
  const [pause, setPause] = useState(false)

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
        setPause(true);
      }
    }
  }, 1000);
  
  return () => clearInterval(addSec);
  });

  const startRun = () => {  
    setRun(!run)
    if (run == false) {
      setBtnText("Pause")
    } else {
      setBtnText("Start")
    }
  };

  const breakTime = pause ? <Modal /> : null;

  return (
    <div className="clock">
      <div>
        <h2>{minute.toString().padStart(2, '0')}:{second.toString().padStart(2, '0')}</h2>
      </div>
      <button onClick={startRun} id="startBTN">{btnText}</button>

      {breakTime}
      
    </div>
  )
}