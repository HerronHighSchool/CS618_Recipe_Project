let io;

export function handleSocket(ioInstance) {
  io = ioInstance;
  
  io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);
    
    socket.on('disconnect', () => {
      console.log('❌ User disconnected:', socket.id);
    });
  });
}

// Export function to get io instance so that it can be used once created. 
export function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized!');
  }
  return io;
}