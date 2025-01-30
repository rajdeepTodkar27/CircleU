import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { format } from 'date-fns';

interface Message {
  _id: string;
  content: string;
  sender: string;
  room: string;
  timestamp: Date;
}

interface ChatProps {
  username: string;
  room: string;
}

const Chat: React.FC<ChatProps> = ({ username, room }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize socket connection
    fetch('/api/socket');
    const newSocket = io('http://localhost:3000', { path: '/socket.io' });

    setSocket(newSocket);

    // Join room and get message history
    newSocket.emit('join-room', room);

    newSocket.on('message-history', (history: Message[]) => {
      setMessages(history);
    });

    newSocket.on('receive-message', (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      newSocket.close();
    };
  }, [room]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const messageData = {
        room,
        message: message.trim(),
        sender: username,
      };
      socket.emit('send-message', messageData);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg">
        <h2 className="text-xl font-semibold">Chat Room: {room}</h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg._id} className={`mb-4 ${msg.sender === username ? 'text-right' : 'text-left'}`}>
            <div
              className={`inline-block max-w-[70%] p-3 rounded-lg ${
                msg.sender === username ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm font-semibold mb-1">{msg.sender}</p>
              <p className="break-words">{msg.content}</p>
              <p className="text-xs mt-1 opacity-75">{format(new Date(msg.timestamp), 'HH:mm')}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
