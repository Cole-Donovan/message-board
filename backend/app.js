const express = require('express');
const cors = require('cors');

const app = express();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow cross-origin requests from your frontend (on port 3001)
app.use(cors({
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200
}));

// Sample messages array
const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
];

// Route to get all messages as JSON (for frontend)
app.get('/api/messages', (req, res) => {
    res.json({ messages });
});

// Route to post a new message (for frontend form submission)
app.post('/api/messages', (req, res) => {
    const { user, message } = req.body;
    const newMessage = {
        text: message,
        user: user || "Anonymous", // Default user if not provided
        added: new Date()
    };
    messages.push(newMessage); // Add the new message to the array
    res.status(201).json({ message }); // Respond with the new message
});

// Route to clear all messages
app.delete('/api/messages', (req, res) => {
    messages.length = 0; // Clear the messages array
    res.status(204).send(); // Send a No Content response
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});
