import React, { useEffect, useState } from "react";
import Image from 'next/image';

const Timer = () => {
  /* TODO: Der Timer sollte vom Calendar die aktuellen werte bzw. Zeit ausgeben 
             wie lange ein jetziges Event nocht braucht bis es fertig ist
  */

  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (timer === 0) {
      setIsTimerRunning(false);
    } else if (timer && isTimerRunning) {
      const countdown = setInterval(() => {
        setTimer((prev) => (prev !== null ? prev - 1 : null));
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer, isTimerRunning]);

  const startTimer = () => {
    setTimer(45 * 60); // 45 Minuten in Sekunden (Hard-coded)
    setIsTimerRunning(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <>
    <div>
      <div className="flex items-center space-x-3 bg-white p-4 rounded-xl  dark:bg-sky-950 transition-colors duration-300">
        <div className="flex items-center justify-center text-black text-sm ">
          {isTimerRunning && timer !== null ? formatTime(timer) : "EventTimer"}
        </div>
        <button
          onClick={startTimer}
          disabled={isTimerRunning}
          className={`${
            isTimerRunning ? "bg-red-500" : "bg-[#28AD5E]"
          } p-2 text-white rounded-md flex items-center justify-center`}
        >
          <Image
            src="/assets/icons/play_icon.svg"
            alt="play_icon"
            className="m-1"
            width={10}
            height={10}
          />
        </button>
      </div>
      </div>
    </>
  );
};

export default Timer;
