import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); // Updates every 10 milliseconds for accuracy
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (totalMilliseconds) => {
    const minutes = Math.floor(totalMilliseconds / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    const pad = (num) => String(num).padStart(2, '0');

    return {
      minutes: pad(minutes),
      seconds: pad(seconds),
      milliseconds: pad(milliseconds),
    };
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps([time, ...laps]);
  };

  const { minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="stopwatch-container">
      <h1 className="title">STOPWATCH</h1>
      
      {/* Time Display */}
      <div className="time-display">
        <span>{minutes}</span>:
        <span>{seconds}</span>
        <span className="ms">.{milliseconds}</span>
      </div>

      {/* Controls */}
      <div className="controls">
        <button 
          className={`btn reset-btn ${time === 0 ? 'disabled' : ''}`} 
          onClick={handleReset}
          disabled={time === 0}
        >
          Reset
        </button>

        <button 
          className={`btn start-btn ${isRunning ? 'stop' : 'start'}`} 
          onClick={handleStartStop}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>

        <button 
          className={`btn lap-btn ${!isRunning ? 'disabled' : ''}`} 
          onClick={handleLap}
          disabled={!isRunning}
        >
          Lap
        </button>
      </div>

      {/* Laps Section */}
      {laps.length > 0 && (
        <div className="laps-container">
          <div className="laps-header">
            <span>Lap</span>
            <span>Time</span>
          </div>
          <ul className="laps-list">
            {laps.map((lapTime, index) => {
              const lapFormatted = formatTime(lapTime);
              return (
                <li key={index} className="lap-item">
                  <span className="lap-number">#{laps.length - index}</span>
                  <span className="lap-time">
                    {lapFormatted.minutes}:{lapFormatted.seconds}.{lapFormatted.milliseconds}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;