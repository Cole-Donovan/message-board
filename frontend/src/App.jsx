import React, { useState, useEffect } from 'react';
import Messages from './components/Messages';
import NewMessage from './components/NewMessage';
import axios from 'axios';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Fetch messages when component mounts or refresh state changes
  useEffect(() => {
    fetchMessages();
  }, [refresh]);

  const fetchMessages = () => {
    axios.get('http://localhost:3000/api/messages')
      .then(response => setMessages(response.data.messages))
      .catch(error => console.error('Error fetching messages:', error));
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const clearMessages = () => {
    axios.delete('http://localhost:3000/api/messages')
      .then(() => {
        setMessages([]); // Clear local state as well
        alert('All messages cleared!');
      })
      .catch(error => console.error('Error clearing messages:', error));
  };

  return (
    <div>
      <h1>Welcome to the Message Board</h1>
      
      {/* NewMessage component to add new messages */}
      <NewMessage onNewMessage={handleRefresh} />

      {/* Display all messages */}
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            <strong>{msg.user}:</strong> {msg.text} <em>({new Date(msg.added).toLocaleString()})</em>
          </li>
        ))}
      </ul>

      {/* Button to clear all messages */}
      <button onClick={clearMessages}>Clear</button>
    </div>
  );
};

export default App;
