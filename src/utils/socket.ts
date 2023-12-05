import { io, Socket } from 'socket.io-client';

export const socket: Socket = io(import.meta.env.VITE_APP_BACK_URL);
export const chatSocket: Socket = io(`${import.meta.env.VITE_APP_BACK_URL}/chat`);
