const express = require('express')
const {
    registerCustomer,
    loginCustomer,
} = require('../controllers/customerController')

const router = express.Router()

// Login route
router.post('/login', loginCustomer)

// Register route
router.post('/register',registerCustomer)


module.exports = router