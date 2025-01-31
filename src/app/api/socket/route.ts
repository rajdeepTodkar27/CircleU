import { NextRequest, NextResponse } from "next/server";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

type GlobalWithIO = typeof globalThis & { io?: SocketIOServer };

export async function GET(req: NextRequest) {
  const globalWithIO = global as GlobalWithIO;

  if (!globalWithIO.io) {
    console.log("Initializing WebSocket server...");

    // Check if the HTTP server exists
    if (!(global as any).httpServer) {
      return NextResponse.json({ error: "HTTP Server not found" }, { status: 500 });
    }

    // Attach Socket.IO to the global HTTP server
    globalWithIO.io = new SocketIOServer((global as any).httpServer, {
      path: "/api/socket",
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    // Handle WebSocket connections
    globalWithIO.io.on("connection", (socket: Socket) => {
      console.log("New client connected:", socket.id);

      socket.on("join-room", (roomId: string) => {
        socket.join(roomId);
        console.log(`${socket.id} joined room ${roomId}`);
      });

      socket.on("send-message", (message: { roomId: string; content: string; userId: string; username: string }) => {
        globalWithIO.io?.to(message.roomId).emit("receive-message", message);
        console.log("Message sent to room:", message);
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });
  }

  return NextResponse.json({ message: "WebSocket Server Ready" });
}
