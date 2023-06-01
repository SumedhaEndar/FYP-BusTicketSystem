const express = require('express')
const {
    getProfile,
    updateProfile
} = require('../controllers/customerDashboardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// Get Customer Profile
router.get('/profile', getProfile)

// Update a customer profile
router.put('/profile', updateProfile)



module.exports = router