export interface MessageObj {
  name: string;
  date: string;
  content: string;
  id: string;
}

export interface MessageProps {
  message: MessageObj;
}

function Message({ message }: MessageProps) {
  return (
    <li key={message.id}>
      <h3>{message.name} ({message.date}):</h3>
      <p>{message.content}</p>
    </li>
  );
}

export default Message;