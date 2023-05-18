import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Instructions from '../src/components/Instructions';
import Consent from '../src/components/Consent';
import Game from '../src/components/Game';
import Feedback from './components/Feedback';
import Thankyou from './components/Thankyou';
import Exit from './components/Exit';

// import { useHistory } from 'react-router-dom';

const App = () => {
return(  
  
    <Router>
      <Routes>
        <Route exact path="/" element={<Consent/>} />
        <Route path="/instructions" element={<Instructions/>} />
        <Route path="/game" element={<Game/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/thankyou" element={<Thankyou/>} />
        <Route path="/exit" element={<Exit/>} />
      </Routes>
    </Router>
  
);
}

export default App;