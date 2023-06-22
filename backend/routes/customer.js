const express = require('express')
const {
    registerCustomer,
    loginCustomer,
    createFeedback,
} = require('../controllers/customerController')

const router = express.Router()

// Login route
router.post('/login', loginCustomer)

// Register route
router.post('/register',registerCustomer)

// Create feedback
router.post('/feedback',createFeedback)

module.exports = router