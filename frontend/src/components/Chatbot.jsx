/*import React, { useState } from 'react';
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

export default Chatbot;*/





/*import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import "../components/chatbot.css";
import { AuthContext } from "../contexts/AuthContext";

const Chatbot = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am your financial assistant. Ask me about your expenses or investments." },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const userMessage = input;
    setInput("");

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/chatbot/query",
        { message: userMessage, userId: user?.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (err) {
      console.error("Chatbot error:", err.response?.data || err.message);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Something went wrong. Try again." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">💬 AI Financial Assistant</div>
      <div className="chatbot-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Ask me about expenses, savings, or investments..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;*/

/*import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import "./Chatbot.css";

const Chatbot = () => {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/chatbot/query",
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const botMessage = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage = {
        sender: "bot",
        text: "Error: Could not reach chatbot",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Ask me about your expenses or investments..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbot;*/

import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import "./Chatbot.css";

export default function Chatbot() {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = { from: "user", text: input };
    setMessages([...messages, newMsg]);

    const res = await axios.post(
      "http://localhost:5000/api/chatbot/query",
      { message: input },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setMessages((prev) => [
      ...prev,
      { from: "bot", text: res.data.reply },
    ]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      <h3>AI Financial Assistant</h3>
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about surplus, crypto, mutual funds..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}



