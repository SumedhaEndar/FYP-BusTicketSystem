const express = require('express')
const {
    addEmployee,
    deleteEmployee,
    getEmployees,
    getEmployeeProfile,
    updateEmployeeProfile,
    getFeedback,
    deleteFeedback
} = require('../controllers/adminDashboardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// Admin Dash Employee
router.post('/employees', addEmployee)
router.get('/employees', getEmployees)
router.delete('/employees/:id', deleteEmployee)

// Admin Dash Profile
router.get('/employee/profile', getEmployeeProfile)
router.put('/employee/profile', updateEmployeeProfile)

// Admin Dash Feedback
router.get('/feedback',getFeedback)
router.delete('/feedback/:id', deleteFeedback)

module.exports = router