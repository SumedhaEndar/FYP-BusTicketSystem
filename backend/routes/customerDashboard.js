const express = require('express')
const {
    getProfile,
    updateProfile,
    getEnrichPoints,
    addBooking
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

router.post('/bookings', addBooking)

module.exports = router