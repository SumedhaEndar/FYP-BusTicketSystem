const express = require('express')
const {
    updateCustomer
} = require('../controllers/customerDashboardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// Update Customer Profile
router.put('/update/:id', updateCustomer)


module.exports = router