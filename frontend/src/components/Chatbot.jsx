import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Optional: for styling

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your AI Financial Assistant. Ask me anything like 'How much surplus do I have?'", sender: "bot" }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const res = await axios.post('/api/chatbot/query', { message: input });
      const botReply = { text: res.data.reply, sender: "bot" };
      setMessages(prev => [...prev, botReply]);
    } catch (err) {
      const errorMsg = { text: "Sorry, I couldn't understand that.", sender: "bot" };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbox mb-2">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-group">
        <input
          type="text"
          value={input}
          placeholder="Ask me something..."
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="form-control"
        />
        <button onClick={sendMessage} className="btn btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
