import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
const API_URL = 'https://api.api-ninjas.com/v1/quotes';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());
  const [speed, setSpeed] = useState(1);
  const [quoteData, setQuoteData] = useState(null);
  const [error, setError] = useState(null);

  const intervalRef = useRef(null);

  useEffect(() => {
    const updateClock = () => {
      setTime(prevTime => new Date(prevTime.getTime() - 1000 * speed));
    };
    intervalRef.current = setInterval(updateClock, 1000);
    return () => clearInterval(intervalRef.current);
  }, [speed]);

  const handleShare = () => {
    const url = `${window.location.origin}${window.location.pathname}?speed=${speed}`;
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const speedParam = params.get('speed');
    if (speedParam) setSpeed(Number(speedParam));
  }, []);

  const handleSpeedChange = (event) => {
    setSpeed(Number(event.target.value));
  };

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const hourDegrees = (time.getHours() % 12) * 30;
  const minuteDegrees = time.getMinutes() * 6;
  const secondDegrees = time.getSeconds() * 6;

  // Fetch quotes
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            'X-Api-Key': '6enncat23alW3JsPVaA9HMmVTMm6PX7hMHgGd5Ct',
          },
        });

        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }

        setQuoteData(response.data[0]); // Assume response data is an array
      } catch (error) {
        setError(error.message);
      }
    };

    fetchQuote();
    const interval = setInterval(fetchQuote, 5000); // Fetch new quote every 5 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="flex flex-col absolute  items-center justify-center w-[35%] h-full rounded-lg  bg-blue-100 text-white">
      <div className="relative w-32 h-32 flex  items-center mt-2  justify-center bg-gray-800 rounded-full border-8 border-gray-700 shadow-lg">
        <div className="absolute w-full h-full flex justify-center items-center">
          <div className="absolute w-1 h-8 bg-red-500 origin-bottom" style={{ transform: `rotateZ(${-secondDegrees}deg)` }} />
          <div className="absolute w-1 h-6 bg-green-500 origin-bottom" style={{ transform: `rotateZ(${-minuteDegrees}deg)` }} />
          <div className="absolute w-1 h-4 bg-blue-500 origin-bottom" style={{ transform: `rotateZ(${-hourDegrees}deg)` }} />
        </div>
        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute text-white text-lg" style={{
            transform: `rotate(${i * 30}deg)`,
            transformOrigin: 'center center',
          }}>
            <div style={{
              transform: `rotate(-${i * 30}deg)`,
              transformOrigin: 'center center',
              marginTop: '-60px',
            }}>
              {i + 1}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-2xl text-black font-bold">{formatTime(time)}</div>
      <input type="range" min="1" max="10" value={speed} onChange={handleSpeedChange} className="w-32 mt-4" />
      <button onClick={handleShare} className="mt-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-700">Share</button>

          <div className="QOUTE  m-8   relative flex bg-red-200 rounded-lg  ">

      {error && <div>Error: {error}</div>}
      {quoteData ? (
        <div className=" p-6 text-auto text-black">
          <p>"{quoteData.quote}"</p>
          <p>- {quoteData.author}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
      </div>
  );
};

export default AnalogClock;
