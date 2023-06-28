const express = require('express')
// Partner Controller Function
const {
    registerPartner,
    loginPartner
} = require('../controllers/partnerController')
const router = express.Router()

// Partner Registration
router.post('/register',registerPartner)

// Partner Login
router.post('/login',loginPartner)


module.exports = router