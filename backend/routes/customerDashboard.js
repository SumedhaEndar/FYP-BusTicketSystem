const express = require('express')
const {
    getProfile,
    updateProfile,
    getEnrichPoints,
    addBooking,
    getBooking,
    getOneBooking,
    deleteBooking
} = require('../controllers/customerDashboardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// Get Customer Profile
router.get('/profile', getProfile)

// Update a customer profile
router.put('/profile', updateProfile)

// Get Customer Enrich Points and Refund Tokens
router.get('/enrich-points', getEnrichPoints)

// Bookings
router.post('/bookings', addBooking)
router.get('/bookings',getBooking)
router.get('/bookings/:id',getOneBooking)
router.post('/bookings/:id', deleteBooking)

module.exports = router