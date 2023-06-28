const express = require('express')
const {
    registerCustomer,
    loginCustomer,
    createFeedback,
    getStations,
    getCarousels
} = require('../controllers/customerController')

const router = express.Router()

// Login route
router.post('/login', loginCustomer)

// Register route
router.post('/register',registerCustomer)

// Create feedback
router.post('/feedback',createFeedback)

// Get Stations
router.get('/stations', getStations)

// Get Carousels
router.get('/carousels', getCarousels);

module.exports = router