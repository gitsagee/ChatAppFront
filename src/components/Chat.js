import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { customAlphabet } from 'nanoid';
import './Chat.css';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 5);

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state.username; 
  const [roomKey, setRoomKey] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleJoinRoom = () => {
    console.log(`joining room ${roomKey}`);
    navigate('/chat/roomchat', { state: { username, roomKey } });
  };

  const handleCreateRoom = () => {
    const newRoomKey = nanoid();
    setRoomKey(newRoomKey);
    console.log('creating room');
    navigate('/chat/roomchat', { state: { username, roomKey: newRoomKey, roomName } });
  };

  return (
    <div className="chat-container">
      <h1>Welcome to the Chat Room</h1>
      <div className='join-room'>
        <h2>Join a Room</h2>
        <input 
          type='text' 
          placeholder='Room Key' 
          onChange={(e) => setRoomKey(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      <div className='create-room'>
        <h2>Create a Room</h2>
        <input 
          type='text' 
          placeholder='Room Name' 
          onChange={(e) => setRoomName(e.target.value)}
        />
        <button onClick={handleCreateRoom}>Create Room</button>
      </div>
    </div>
  );
};

export default Chat;
