import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NewMessage = () => {
  const [text, setText] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    // Post new message to backend
    axios.post('http://localhost:3000/api/messages', { message: text, user })
      .then(() => {
        // Clear input fields
        setText('');
        setUser('');
        // Navigate back to messages page
        navigate('/');
      })
      .catch(error => console.error('Error sending message:', error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Add a New Message</h2>
        <div>
          <input
            type="text"
            placeholder="Your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Your message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button type="submit">Send</button>
      </form>
      <Link to="/">
        <button>Back to Messages</button>
      </Link>
    </div>
  );
};

export default NewMessage;
