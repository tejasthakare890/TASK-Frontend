import React from 'react';

const Page2 = () => {
  return (
    <div className="relative justify-center  flex h-screen">
    <img src='i1.png' className= " I absolute inset-0 w-full h-full object-cover" alt="Background" />


    <div className=" media absolute inset-x bottom-0 mb-10 w-4/5   bg-orange-500 bg-opacity-90 text-white p-8 rounded-2xl">
      <h1 className=" txt1 text-3xl font-bold mb-4">We serve incomparable delicacies</h1>
      <p className=" txt2 text-lg mb-8">
        All the best restaurants with their top menu waiting for you, they can’t wait for your order!!
      </p>
      <div className="flex justify-between items-center">
      <a href="/Login" >
          <button className=" txt3 text-lg">Skip</button>
        </a>
        <div className=" txt4 flex space-x-2">
          <div className="w-4 h-1 bg-white opacity-50"></div>
          <div className="w-4 h-1 bg-white "></div>
          <div className="w-4 h-1 bg-white opacity-50"></div>
        </div>
        <a href="/Page3" className=" txt3 text-lg flex items-center">
          Next <span className="ml-2">→</span>
        </a>
      </div>
    </div>
  </div>
  );
};

export default Page2;
