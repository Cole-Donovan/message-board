import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from the backend
    axios.get('http://localhost:3000/api/messages')
      .then(response => setMessages(response.data.messages))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  const clearMessages = () => {
    axios.delete('http://localhost:3000/api/messages')
      .then(() => {
        // Clear the messages from state after deleting
        setMessages([]);
      })
      .catch(error => console.error('Error clearing messages:', error));
  };

  return (
    <div>
      <h2>Message Board</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <strong>{message.user}:</strong> {message.text} <em>({new Date(message.added).toLocaleString()})</em>
          </li>
        ))}
      </ul>
      <button onClick={clearMessages}>Clear Messages</button>
      <Link to="/new">
        <button>Add New Message</button>
      </Link>
    </div>
  );
};

export default Messages;
