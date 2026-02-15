const express = require('express');
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBookingById
} = require('../controllers/bookingController');

/**
 * POST /api/bookings
 * Create a new booking
 */
router.post('/', (req, res) => {
  console.log('[Route] POST /api/bookings');
  createBooking(req, res);
});

/**
 * GET /api/bookings/all
 * Get all bookings
 */
router.get('/all', (req, res) => {
  console.log('[Route] GET /api/bookings/all');
  getAllBookings(req, res);
});

/**
 * GET /api/bookings/:id
 * Get booking by ID (Bonus feature)
 */
router.get('/:id', (req, res) => {
  console.log(`[Route] GET /api/bookings/${req.params.id}`);
  getBookingById(req, res);
});

module.exports = router;
