import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from '../App';
import Chat from './Chat';
import RoomChat from './RoomChat';

function Routew() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/chat" element={<Chat />} />
        <Route path ="/chat/roomchat" element={<RoomChat />} />
      </Routes>
    </Router>
  );
}

export default Routew;
