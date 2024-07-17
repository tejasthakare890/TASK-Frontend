import React, { useState } from 'react';
import { BsFillArrowRightCircleFill } from "react-icons/bs";


const Page3 = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Simulate a delay for the loading spinner (e.g., 2 seconds)
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="main flex relative items-center   justify-center">
      <img src='i1.png' className=" h-screen w-screen" />

      <div className=" medi absolute justify-center  items-center  w-4/5  inset-x-30 bottom-10 rounded-2xl flex flex-col  p-8 bg-orange-500 bg-opacity-90 text-white">

        <h1 className="tx1 text-3xl justify-center  items-center font-bold mb-4">We serve incomparable delicacies</h1>
        <p className="tx2 text-lg mb-8">
          All the best restaurants with their top menu waiting for you, they can’t wait for your order!!
        </p>
        <div className="flex tx4 justify-center items-center space-x-2">
          <div className="w-4 h-1 bg-white opacity-50"></div>
          <div className="w-4 h-1 bg-white opacity-50"></div>
          <div className="w-4 h-1 bg-white"></div>
        </div>

        <a href='/Login'>
        <button 
          className="text-lg flex justify-center  items-center relative mt-10" 
          aria-label="Explore more" 
          onClick={handleClick}
          disabled={loading}
        >
          {loading && (
            <div className="absolute  tx4 flex justify-center items-center">
              <div className="loader"></div>
            </div>
          )}
          <BsFillArrowRightCircleFill size={50}  className={`${loading ? 'text-opacity-50 ' : ''}`} />
        </button>
        </a>
      </div>
    </div>
  );
};

export default Page3;
