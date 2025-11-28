import { io } from 'socket.io-client';

// Check if environment variable exists
if (!import.meta.env.VITE_SOCKET_HOST) {
  console.error('VITE_SOCKET_HOST is not defined in .env file');
}

// Prevent multiple connections during hot reload
let socket;

if (!window.__socket) {
  socket = io(import.meta.env.VITE_SOCKET_HOST, {
    autoConnect: true,
  });

  socket.on('connect', () => {
    console.log('connected to socket.io as', socket.id);
  });

  socket.on('connect_error', (err) => {
    console.error('socket.io connect error:', err," id:", socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('disconnected:', reason);
  });

  // Store on window to persist through hot reloads
  window.__socket = socket;
} else {
  socket = window.__socket;
}

export default socket;