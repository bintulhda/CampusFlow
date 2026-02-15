// In-memory storage for bookings
let bookings = [];
let bookingCounter = 1000; // Starting counter for booking ID

/**
 * Generate unique booking ID
 * Format: BK1234
 */
const generateBookingId = () => {
  bookingCounter++;
  return `BK${bookingCounter}`;
};

/**
 * Create a new booking
 * POST /api/bookings
 */
const createBooking = (req, res) => {
  try {
    console.log('[createBooking] Received request body:', req.body);

    const { name, date, timeSlot } = req.body;

    // Validation: Check for required fields
    if (!name || !date || !timeSlot) {
      console.log('[createBooking] Validation failed - Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'Missing required fields: name, date, timeSlot'
      });
    }

    // Validate field types
    if (typeof name !== 'string' || typeof date !== 'string' || typeof timeSlot !== 'string') {
      console.log('[createBooking] Validation failed - Invalid field types');
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: 'All fields must be strings'
      });
    }

    // Create new booking object
    const newBooking = {
      bookingId: generateBookingId(),
      name: name.trim(),
      date: date.trim(),
      timeSlot: timeSlot.trim(),
      status: 'Approved',
      createdAt: new Date().toISOString()
    };

    // Store booking in memory
    bookings.push(newBooking);

    console.log('[createBooking] Booking created successfully:', newBooking.bookingId);

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking
    });
  } catch (error) {
    console.error('[createBooking] Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get all bookings
 * GET /api/bookings/all
 */
const getAllBookings = (req, res) => {
  try {
    console.log('[getAllBookings] Fetching all bookings. Total count:', bookings.length);

    if (bookings.length === 0) {
      console.log('[getAllBookings] No bookings found');
      return res.status(200).json({
        success: true,
        message: 'No bookings found',
        data: [],
        count: 0
      });
    }

    // Return all bookings
    res.status(200).json({
      success: true,
      message: 'Bookings retrieved successfully',
      data: bookings,
      count: bookings.length
    });
  } catch (error) {
    console.error('[getAllBookings] Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

/**
 * Get booking by ID (Bonus feature)
 * GET /api/bookings/:id
 */
const getBookingById = (req, res) => {
  try {
    const { id } = req.params;
    console.log('[getBookingById] Searching for booking:', id);

    const booking = bookings.find(b => b.bookingId === id);

    if (!booking) {
      console.log('[getBookingById] Booking not found:', id);
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    console.log('[getBookingById] Booking found:', id);
    res.status(200).json({
      success: true,
      message: 'Booking retrieved successfully',
      data: booking
    });
  } catch (error) {
    console.error('[getBookingById] Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById
};
