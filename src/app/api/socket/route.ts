import { Server as SocketIOServer } from 'socket.io';
import { NextResponse } from 'next/server';

export const GET = (req: Request) => {
  const { socket } = (req as any).server;
  
  if (socket?.io) {
    console.log('Socket.IO already running');
  } else {
    console.log('Initializing Socket.IO');
    const io = new SocketIOServer(socket, {
      path: '/socket.io',
    });
    (req as any).server.io = io;

    io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }

  return NextResponse.json({ status: 'Socket Initialized' });
};
