import React, { useState, useEffect } from 'react';
import axios from 'axios'; // or use fetch()

const Messages = ({ refresh }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Fetch messages from the backend
    axios.get('http://localhost:3000/api/messages')
      .then(response => setMessages(response.data.messages))
      .catch(error => console.error('Error fetching messages:', error));
  }, [refresh]);

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
    </div>
  );
};

export default Messages;
