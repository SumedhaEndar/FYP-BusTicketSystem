const express = require('express')
const multer = require('multer');
const path = require('path');
const {
    getProfile,
    publishPlans,
    updateProfile,
    getRoutes,
    addLogo
} = require('../controllers/partnerDashboardController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// Get Partner Profile
router.get('/profile', getProfile)
router.put('/profile', updateProfile)

// Publish Plans
router.post('/plans',publishPlans)

// Get Routes
router.get('/routes',getRoutes)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images/logoImages'); // Specify the destination directory where the uploaded files should be stored
    },
    filename: function (req, file, cb) {
        // const extension = path.extname(file.originalname);
        const filename = file.originalname;
      cb(null, filename);
    }
  });
const upload = multer({ storage: storage });
router.post('/logoImg', upload.single('image'), addLogo)

module.exports = router