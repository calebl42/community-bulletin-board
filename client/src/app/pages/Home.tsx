import { useState, useEffect } from 'react';
import Message, { type MessageObj } from './../../components/Message.tsx';
import InputMessageBar from './../../components/InputMessageBar.tsx';

let initMessages = false;

function Home() {
  const [ messages, setMessages ] = useState<MessageObj[]>([]);

  async function getMessages() {
    try {
      const response = await fetch('http://localhost:8080/api/messages');
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setMessages(await JSON.parse(result));
    } catch (err) {
      console.error('Error fetching messages, ' + err);
    }
  }

  useEffect(() => {
    if (!initMessages) {
      getMessages();
    }
    initMessages = true;
  }, []);

  return (
    <>
      <header>
        <h1>Community Bulletin Board</h1>
      </header>
      <main>
        <InputMessageBar messages={messages} setMessages={setMessages} />
        <ul>
          {messages && messages.reverse().map((m) => <li key={m.id}><Message message={m} /></li>)}
        </ul>
      </main>
      <footer>
        <p>2025 Caleb Lee</p> 
      </footer>
    </>
  )
}

export default Home;