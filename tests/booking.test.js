
const Booking = require('../models/Bookings');
const Availability = require('../models/Availability');
const cons = require('../constants');
const {
    postBooking,
    getBookings
} = require('../controllers/bookingControllers/booking');

describe('Bookings Controllers', () => {
    describe('postBookings', () => {
        it('should post a new booking', async () => {
            const req = {
                body: {
                    userId: '123',
                    date: '2022-01-01',
                    slot: {
                        start: '10:00',
                        end: '11:00'
                    }
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();
            const mockAvailability = {
                day: 'Saturday',
                slots: [
                    {
                        start: '10:00',
                        end: '11:00',
                        maxCapacity: 1
                    }
                ],
                _id: '6612c83cbfad4483b399edea'
            };
            const mockBooking = {
                _id: '6612c83cbfad4483b399edea',
                date: new Date('2022-01-01'),
                slot: {
                    start: '10:00',
                    end: '11:00'
                }
            };
            Availability.findOne = jest.fn().mockResolvedValue(mockAvailability);
            Booking.prototype.save = jest.fn().mockResolvedValue();
            Availability.findOneAndUpdate = jest.fn().mockResolvedValue();
            await postBooking(req, res, next);
            expect(res.status).toHaveBeenCalledWith(cons.created);
            expect(res.json).toHaveBeenCalledWith({
                message: cons.successful,
                booking: expect.objectContaining({
                    date: mockBooking.date,
                    slot: mockBooking.slot
                })
            });


        })
    })


    describe('getBookings', () => {
        it('Should get all bookings', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();
            const mockBookings = [
                {
                    _id: '123',
                    userId: '123',
                    date: '2022-01-01',
                    slot: {
                        start: '10:00',
                        end: '11:00'
                    }
                }
            ];
            Booking.find = jest.fn().mockResolvedValue(mockBookings);
            await getBookings(req, res, next);
            expect(res.status).toHaveBeenCalledWith(cons.ok);
            expect(res.json).toHaveBeenCalledWith(mockBookings);
        })
    })
})
