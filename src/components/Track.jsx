import React from 'react';
import { MapIcon, ZoomOutIcon, ZoomInIcon, PhoneIcon, ClockIcon, CheckCircleIcon, LocationMarkerIcon } from '@heroicons/react/outline';
import Analog from './Analog';
import { useMediaQuery } from 'react-responsive';

const OrderTracking = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className="relative w-screen h-screen">
      {/* Map Background */}
      <iframe
        title="Order Tracking Map"
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d232.51321708206515!2d78.95331607508433!3d21.183756575355684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1720881607032!5m2!1sen!2sin"
        style={{ border: '0', width: '100%', height: '100%', position: 'absolute', zIndex: '0' }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>

      {/* Header */}
      <div className={`absolute top-0 ${isMobile ? 'w-full' : 'w-[60%] ml-[38%]'} h-[10%] z-18 flex justify-between items-center p-4 bg-white shadow-md rounded-lg m-2`}>
        <button className="p-2 rounded-full hover:bg-gray-200">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Order Tracking</h1>
        <div className="flex space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <ZoomInIcon className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <ZoomOutIcon className="w-6 h-6" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <MapIcon className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Clock */}
      {!isMobile && <Analog />}

      {/* Order Details */}
      <div className={`absolute bottom-0 ${isMobile ? 'w-full' : 'w-[60%] ml-[38%]'} z-10 m-2 bg-white shadow-md rounded-lg p-4`}>
        <div className="flex items-center space-x-4">
          <img src="d.png" alt="Delivery Boy" className="w-12 h-12 rounded-full" />
          <div className="flex-1">
            <h2 className="text-xs font-semibold">Matt</h2>
            <p className="text-xs text-gray-600">Delivery boy</p>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <PhoneIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4 mt-4">
          <div className="flex items-start space-x-2">
            <CheckCircleIcon className="w-6 h-6 text-green-500" />
            <div className="flex-1">
              <h3 className="text-xs font-semibold">Order accepted</h3>
              <p className="text-xs text-gray-600">at 12.05</p>
            </div>
            <ClockIcon className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex items-start space-x-2">
            <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14v2m0 4h.01M5.455 11.024a6.063 6.063 0 000 1.428 6.005 6.005 0 005.546 5.548 6.062 6.062 0 001.43 0M15 13.495A6.042 6.042 0 0115.024 12a6.062 6.062 0 000-1.43 6.005 6.005 0 00-5.548-5.546 6.063 6.063 0 00-1.43 0" />
            </svg>
            <div className="flex-1">
              <h3 className="text-xs font-semibold">Food is preparing</h3>
              <p className="text-xs text-gray-600">at 12.15</p>
            </div>
            <ClockIcon className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex items-start space-x-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-4.096-4.096-1.415 1.415 4.096 4.096A2.996 2.996 0 0012 15a3 3 0 105.657-1.586 2.996 2.996 0 00-2.905-2.246zM9 13a1.5 1.5 0 11-2 2m0-2a1.5 1.5 0 012 0zm3-6v3h3" />
            </svg>
            <div className="flex-1">
              <h3 className="text-xs font-semibold">Ready to Ship</h3>
              <p className="text-xs text-gray-600">at 12.30</p>
            </div>
            <ClockIcon className="w-6 h-6 text-gray-400" />
          </div>
          <div className="flex items-start space-x-2">
            <LocationMarkerIcon className="w-6 h-6 text-red-500" />
            <div className="flex-1">
              <h3 className="text-xs font-semibold">Order at location</h3>
              <p className="text-xs text-gray-600">at 12.45</p>
            </div>
            <ClockIcon className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* Order Summary */}
        <button className="w-full flex items-center justify-between p-4 rounded-lg bg-orange-500 text-white mt-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="food.png" alt="Cheese Garlic Bread" className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="text-xs font-semibold">Cheese Garlic Bread</h3>
                <p className="text-xs">2 X</p>
              </div>
            </div>
            <p className="text-xs font-semibold">Rs 280</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
