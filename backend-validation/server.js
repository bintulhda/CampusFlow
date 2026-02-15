const express = require('express');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Logging middleware for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/bookings', bookingRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Venue Booking Management System API',
    version: '1.0.0',
    endpoints: {
      'POST /api/bookings': 'Create a new booking',
      'GET /api/bookings/all': 'Get all bookings'
    }
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`[404] Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server is running on http://localhost:${PORT}`);
  console.log(`✓ API Documentation available at http://localhost:${PORT}/`);
});
