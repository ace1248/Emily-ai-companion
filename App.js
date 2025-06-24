import React, { useState } from 'react';
import './App.css';

function App() {
  const [accessCode, setAccessCode] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [avatar, setAvatar] = useState('https://api.dicebear.com/6.x/fun-emoji/svg');
  const [userInput, setUserInput] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'Emily', message: 'Hey there! I’m Emily, your AI companion. Let’s vibe.' }
  ]);

  const handleCodeEntry = () => {
    if (accessCode === '7676') {
      setAuthenticated(true);
    } else {
      alert('Incorrect code, try again!');
    }
  };

  const sendMessage = () => {
    if (!userInput.trim()) return;
    const userMessage = { sender: 'You', message: userInput };
    const aiReply = {
      sender: 'Emily',
      message: `You said: '${userInput}' — I'm listening 👀`
    };
    setChatLog(prev => [...prev, userMessage, aiReply]);
    setUserInput('');
  };

  if (!authenticated) {
    return (
      <div className="container">
        <h1>Enter Access Code</h1>
        <input
          type="password"
          value={accessCode}
          onChange={e => setAccessCode(e.target.value)}
          placeholder="Code here..."
        />
        <button onClick={handleCodeEntry}>Unlock</button>
      </div>
    );
  }

  return (
    <div className="container">
      <img src={avatar} alt="Avatar" className="avatar" />
      <input
        placeholder="Paste image URL to change avatar"
        value={avatar}
        onChange={e => setAvatar(e.target.value)}
      />
      <div className="chat-box">
        {chatLog.map((entry, index) => (
          <div key={index} className={entry.sender === 'You' ? 'right' : 'left'}>
            <strong>{entry.sender}:</strong> {entry.message}
          </div>
        ))}
      </div>
      <div className="input-row">
        <input
          placeholder="Say something..."
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;