const express = require("express");
const router = express.Router();
const bookingControllers = require("../controllers/bookingControllers/booking");
const auth = require("../middlewares/authenticationMiddleware");

router.use(auth.checkAuthenticated);
router.post('/api/bookings/', bookingControllers.postBooking);
router.get('/api/bookings/', bookingControllers.getBookings);

module.exports = router