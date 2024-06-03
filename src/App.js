import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  const userF = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Username:', username);
    navigate('/chat', { state: { username } });
  };

  return (
    <div className="app-container">
      <h1>Welcome to the Chat Room</h1>
      <form className="app-form" onSubmit={handleSubmit}>
        <label htmlFor="username">What is your name:</label>
        <input type="text" id="username" name="username" onChange={userF} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
