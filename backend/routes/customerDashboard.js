const express = require('express')
const {
    updateProfile
} = require('../controllers/customerDashboardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// Update Customer Profile
router.put('/update/:id', updateProfile)


module.exports = router