import React, { useState } from 'react';
import axios from 'axios';

const NewMessage = ({ onNewMessage }) => {
  const [text, setText] = useState('');
  const [user, setUser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Post new message to backend
    axios.post('http://localhost:3000/api/messages', { message: text, user })
      .then(() => {
        // Clear input fields
        setText('');
        setUser('');

        // Call the function passed as a prop to trigger a refresh in Messages
        onNewMessage();
      })
      .catch(error => console.error('Error sending message:', error));
  };

  return (
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
  );
};

export default NewMessage;
