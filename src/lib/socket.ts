import { Server as SocketIOServer } from 'socket.io';
import { Server } from 'http';

let io: SocketIOServer | null = null;

export function initializeSocket(server: Server) {
  if (!io) {
    console.log('Initializing Socket.IO');
    io = new SocketIOServer(server, {
      path: '/socket.io',
      cors: {
        origin: '*',
      },
    });

    io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('send-message', (data) => {
        console.log('Message received:', data);
        io?.emit('receive-message', data); // Broadcast message
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }
  return io;
}

export function getIO() {
  if (!io) {
    throw new Error('Socket.io has not been initialized');
  }
  return io;
}
