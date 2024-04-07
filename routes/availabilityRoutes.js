const express = require('express');
const router = express.Router();

const availabilityController = require('../controllers/availabilityController/availability');
const auth = require('../middlewares/authenticationMiddleware');


router.post('/api/availability', 
    auth.checkAuthenticated, availabilityController.postAvailability);
router.get('/api/available-slots/:date', 
    auth.checkAuthenticated, availabilityController.getAvailability);

module.exports = router;

