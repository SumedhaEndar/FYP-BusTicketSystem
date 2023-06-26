const express = require('express')
const multer = require('multer');
const path = require('path');
const {
    addEmployee,
    deleteEmployee,
    getEmployees,
    getEmployeeProfile,
    updateEmployeeProfile,
    getFeedback,
    deleteFeedback,
    addStation,
    addCarousel,
    deleteCarousel,
    getCarouselList
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

// Admin Dash Others
router.post('/stations', addStation)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/carousels'); // Specify the destination directory where the uploaded files should be stored
    },
    filename: function (req, file, cb) {
        // const extension = path.extname(file.originalname);
        const filename = file.originalname;
      cb(null, filename);
    }
  });
const upload = multer({ storage: storage });
router.post('/carousels', upload.single('image'), addCarousel)
router.delete('/carousels/:id', deleteCarousel)
router.get('/carousels', getCarouselList)

module.exports = router