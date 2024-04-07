const Booking = require('../../models/Bookings');
const Availability = require('../../models/Availability');
const cons = require('../../constants');


const postBooking = async (req, res, next) => {


    try {

        const userId = req.body.userId;
        const date = req.body.date;
        const slot = req.body.slot;

        const availability = await Availability.findOne({
            day: new Date(date).toLocaleDateString('en-US', { weekday: 'long' })
        });

        const bookedSlot = availability.slots.find(s => slot.start <= s.start && slot.end <= s.end);
        if (!bookedSlot || bookedSlot.maxCapacity <= 0) {
            return res.status(cons.conflict).json({ error: cons.notavailable });
        }

        const booking = new Booking({
            userId,
            date,
            slot
        });
        await booking.save();

        bookedSlot.maxCapacity--;
        await Availability.findOneAndUpdate({ day: availability.day }, availability);

        res.status(cons.created).json({ message: cons.successful, booking });
    } catch (err) {
        next(err);
    }
}

const getBookings = async(req,res,next) => {
    try {
        const bookings = await Booking.find();
        res.status(cons.ok).json(bookings);
    } catch (error) {
        next(err);
    }
}

module.exports = {
    postBooking,
    getBookings
}