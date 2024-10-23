import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Messages from './components/Messages';
import NewMessage from './components/NewMessage';

const App = () => {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Messages />} />
          <Route path="/new" element={<NewMessage />} />
        </Routes>
      </div>
  );
};

export default App;
