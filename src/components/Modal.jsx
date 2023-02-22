import "../index.css";
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from "framer-motion";

export default function breakTime() {
    const [breakTime, setBreakTime] = useState(true);
    const [countdownMin, setCountdownMin] = useState(4);
    const [countdownSec, setCountdownSec] = useState(55);

    /* break time */
  useEffect(() => {
    const countdown = setInterval(() => {
      if(breakTime) {
        if (countdownSec == 0) {
          setCountdownSec(59);
          setCountdownMin(countdownMin - 1);
        } else {
          setCountdownSec(countdownSec - 1);
        }
      }

      if (countdownMin == 0 && countdownSec == 0) {
        setBreakTime(false);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [countdownSec, countdownMin, breakTime]);

  const stopBreakTime = () => {
    setBreakTime(false);
  };

  /* To render the Break Time window when it's time to take a break. */
  if (breakTime) {
    return (
        <div className="breakTime" onClick={stopBreakTime}>
            <AnimatePresence mode="wait" >
                {breakTime && (
                    <motion.div className='breakBox' onClick={(e) => e.stopPropagation()} exit={{ opacity: 0}} key="modal" initial={{opacity: 0, y: '-50vh'}} animate={{ opacity: 1, y: 0}} transition={{ duration: 1}} >
                        <h2>{countdownMin.toString().padStart(2, '0')}:{countdownSec.toString().padStart(2, '0')}</h2>
                            <h3>It's time to take a break!</h3>
                            <button onClick={stopBreakTime}> No, thanks!</button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
  } else {
    return (null);
  }
};