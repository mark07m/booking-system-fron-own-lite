const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Mock user data
const mockUser = {
  id: '1',
  email: 'admin@example.com',
  name: 'Администратор',
  role: 'admin',
  avatar: null,
  isEmailVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

// Mock authentication endpoints
app.post('/api/auth/login', (req, res) => {
  console.log('🔐 Mock login request:', req.body);
  
  // Simulate successful login
  res.cookie('auth_token', 'mock-jwt-token', { 
    httpOnly: true, 
    secure: false, 
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
  
  res.json({
    success: true,
    data: {
      user: mockUser,
      token: 'mock-jwt-token'
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  console.log('🚪 Mock logout request');
  res.clearCookie('auth_token');
  res.json({ success: true });
});

app.post('/api/auth/refresh', (req, res) => {
  console.log('🔄 Mock refresh request');
  res.cookie('auth_token', 'mock-jwt-token-refreshed', { 
    httpOnly: true, 
    secure: false, 
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  });
  res.json({
    success: true,
    data: {
      user: mockUser,
      token: 'mock-jwt-token-refreshed'
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  console.log('👤 Mock get current user request');
  res.json({
    success: true,
    data: mockUser
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'mock-api'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   POST /api/auth/login`);
  console.log(`   POST /api/auth/logout`);
  console.log(`   POST /api/auth/refresh`);
  console.log(`   GET  /api/auth/me`);
  console.log(`   GET  /api/health`);
});
