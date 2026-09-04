require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' ? false : '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/iron-world-atlas', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✓ MongoDB connected');
}).catch(err => {
  console.error('✗ MongoDB connection error:', err);
});

// Import routes
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('✓ User connected:', socket.id);

  socket.on('join-game', (data) => {
    console.log('User joined game:', data);
    socket.emit('game-state', { status: 'connected' });
  });

  socket.on('move-unit', (data) => {
    io.emit('unit-moved', data);
  });

  socket.on('disconnect', () => {
    console.log('✗ User disconnected:', socket.id);
  });
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => {
  console.log(`🎮 Iron World Atlas server running on port ${PORT}`);
});
