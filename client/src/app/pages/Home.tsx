import { useState, useEffect } from 'react';
import Message, { type MessageObj } from './../../components/Message.tsx';
function Home() {
  const [ messages, setMessages ] = useState<MessageObj[]>([]);

  async function getMessages() {
    try {
      const response = await fetch('http://localhost:8080/api/messages');
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result = await response.json();
      setMessages(JSON.parse(result));
    } catch (err) {
      console.error('Error fetching messages, ' + err);
    }
  }

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <header>
        <h1>Community Bulletin Board</h1>
      </header>
      <main>
        <ul>
          {messages && messages.map((m) => <Message message={m} />)}
        </ul>
      </main>
      <footer>
        <p>2025 Caleb Lee</p> 
      </footer>
    </>
  )
}

export default Home;