import { io, Socket } from 'socket.io-client';

export const socket: Socket = io('http://localhost:8001');
export const chatSocket: Socket = io('http://localhost:8001/chat');
