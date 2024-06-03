import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import './ChatRoom.css';

const RoomChat = () => {
    const location = useLocation();
    const { username, roomKey } = location.state;
    const [userList, setUserList] = useState([]);
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const socketRef = useRef();
    const messageListRef = useRef();

    useEffect(() => {
        // Initialize the socket connection inside useEffect to ensure it runs once
        socketRef.current = io('https://chatappback-9yb4.onrender.com');

        socketRef.current.emit('join', { username, roomKey });

        const handleMessage = (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        };

        const handleJoined = (data) => {
            setUserList(data.users);
            setMessages(prevMessages => [...prevMessages, { username: 'System', message: data.message }]);
        };

        const handleDisconnect = () => {
            console.log('Socket disconnected');
        };

        socketRef.current.on('message', handleMessage);
        socketRef.current.on('joined', handleJoined);
        socketRef.current.on('disconnect', handleDisconnect);

        // Cleanup function to remove event listeners when the component unmounts
        return () => {
            socketRef.current.off('message', handleMessage);
            socketRef.current.off('joined', handleJoined);
            socketRef.current.off('disconnect', handleDisconnect);
            socketRef.current.disconnect();
        };
    }, [username, roomKey]); // Empty dependency array to run only on mount

    useEffect(() => {
        // Scroll to the bottom of the message list when messages change
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const handleMessageSend = () => {
        socketRef.current.emit('message', { username, message: messageInput });
        setMessageInput('');
    };

    return (
        <div className="chat-wrapper">
            <div className="user-list">
                <h2>User List</h2>
                <ul>
                    {userList.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
            </div>
            <div className="chat-container">
                <h2 className="chat-header">Welcome to Chat Room {roomKey}</h2>
                <div className="message-list" ref={messageListRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className="message">
                            <strong>{msg.username}:</strong> {msg.message}
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={e => setMessageInput(e.target.value)}
                    />
                    <button onClick={handleMessageSend}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default RoomChat;
