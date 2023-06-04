const express = require('express')
const {
    addEmployee,
    deleteEmployee,
    getEmployees,
} = require('../controllers/adminDashboardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// Add an Admin
router.post('/employees', addEmployee)
router.get('/employees', getEmployees)
router.delete('/employees/:id', deleteEmployee)



module.exports = router