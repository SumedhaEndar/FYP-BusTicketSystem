const express = require('express')
const {
    registerCustomer,
    loginCustomer,
    createFeedback,
    getFeedback,
    deleteFeedback
} = require('../controllers/customerController')

const router = express.Router()

// Login route
router.post('/login', loginCustomer)

// Register route
router.post('/register',registerCustomer)

// Create feedback
router.post('/feedback',createFeedback)

// Get feedback
router.get('/feedback',getFeedback)

// Delete feedback
router.delete('/feedback/:id', deleteFeedback)

module.exports = router