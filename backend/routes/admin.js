const express = require('express')
const {
    loginAdmin,
} = require('../controllers/adminController')

const router = express.Router()

// Login route
router.post('/login', loginAdmin)



module.exports = router