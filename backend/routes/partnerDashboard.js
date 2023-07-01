const express = require('express')
const {
    getProfile,
    publishPlans,
    getRoutes
} = require('../controllers/partnerDashboardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// Get Partner Profile
router.get('/profile', getProfile)

// Publish Plans
router.post('/plans',publishPlans)

// Get Routes
router.get('/routes',getRoutes)



module.exports = router