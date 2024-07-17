
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Login from './Login'
import Signup from './Signup'
import Successful from './Successful'
import Track from './Track'






import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function landingPage() {
    return (
      <Router>
        <div className="Main">
          <Routes>
            <Route path="/" element={
              <>
                 <Page1 /> 
                 
                 
              </>
            } />
            <Route path="/Page2" element={<Page2 />} />
            <Route path="/Page3" element={<Page3 />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Successful" element={<Successful />} />
            <Route path="/Track" element={<Track />} />

            






           
  
  
  
  
  
  
          </Routes>
        </div>
      </Router>
    );
  }


  export default landingPage;