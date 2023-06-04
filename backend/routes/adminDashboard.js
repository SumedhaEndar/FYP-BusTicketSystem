const express = require('express')
const {
    addEmployee,
    deleteEmployee,
    getEmployees,
    getEmployeeProfile,
    updateEmployeeProfile
} = require('../controllers/adminDashboardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// Add an Admin
router.post('/employees', addEmployee)
router.get('/employees', getEmployees)
router.delete('/employees/:id', deleteEmployee)

// Update an Admin Profile
router.get('/employee/profile', getEmployeeProfile)
router.put('/employee/profile', updateEmployeeProfile)



module.exports = router