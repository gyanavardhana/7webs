const express = require('express');
const router = express.Router();

const availabilityController = require('../controllers/availabilityController/availability');

router.post('/api/availability', availabilityController.postAvailability);
router.get('/api/available-slots/:date', availabilityController.getAvailability);

module.exports = router;

