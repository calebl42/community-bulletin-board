import { useState } from 'react';
import './InputMessageBar.css';
import { type MessageObj } from './Message.tsx';

interface InputMessageBarProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageObj[]>>;
}

function InputMessageBar({ setMessages }: InputMessageBarProps) {
  const [ currentMessage, setCurrentMessage ] = useState('');
  const [ username, setUsername ] = useState('');

  async function sendNewMessage() {
    try {
      const newMessageObj: MessageObj = {
        'name': username, 
        'date': new Date().toString(),
        'content': currentMessage,
        'id': crypto.randomUUID()
      };
      const response = await fetch('http://valuable-lethia-calebl42-00b31e2a.koyeb.app/api/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessageObj)
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      setMessages(prevMessages => [...prevMessages, newMessageObj]);
    } catch (err) {
      console.error('Error posting new message, ' + err);
    }
  }

  return (
    <form>
      <div id='name-bar'>
        <h3>Name:</h3>
        <input 
          type='text' 
          id='username' 
          name='username' 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>
      <div>
        <div id='send-bar'>
          <h3>Message:</h3>
          <textarea 
            id='textbar' 
            name='textbar' 
            value={currentMessage} 
            onChange={(e) => setCurrentMessage(e.target.value)}
            autoComplete='off'
          />
          <button onClick={(e) => {
            e.preventDefault();
            setCurrentMessage('');
            sendNewMessage();
          }}>send</button>
        </div>
      </div>
    </form>
  );
}

export default InputMessageBar;