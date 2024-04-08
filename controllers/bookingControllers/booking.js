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
        function convertToMinutes(timeString) {
            const [hours, minutes] = timeString.split(':').map(Number);
            return hours * 60 + minutes;
        }
        const slotStartTime = convertToMinutes(slot.start);
        const slotEndTime = convertToMinutes(slot.end);

        const bookedSlot = availability.slots.find(
            (availabilitySlot) => {
                const availabilitySlotStartTime = convertToMinutes(availabilitySlot.start);
                const availabilitySlotEndTime = convertToMinutes(availabilitySlot.end);
                return availabilitySlotStartTime <= slotStartTime && availabilitySlotEndTime >= slotEndTime;
            }
        );

        
        if (!bookedSlot || bookedSlot.maxCapacity <= 0) {
            res.status(cons.conflict).json({ error: cons.notavailable });
        }else{
            const booking = new Booking({
                userId,
                date,
                slot
            });
            await booking.save();
            bookedSlot.maxCapacity -= 1;
            await Availability.findOneAndUpdate({ day: availability.day }, availability);
            res.status(cons.created).json({ message: cons.successful, booking });
        }
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