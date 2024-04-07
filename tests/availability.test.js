const Availability = require("../models/Availability");
const cons = require("../constants");

const {
    postAvailability,
    getAvailability
} = require("../controllers/availabilityController/availability");


describe("availability controller", () => {
    describe("postAvailability", () => {
        it("should post a new availability", async () => {
            const req = {
                body: {
                    day: "Saturday",
                    slots: [
                        {
                            start: "10:00",
                            end: "11:00",
                            maxCapacity: 1
                        }
                    ]
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();
            const mockAvailability = {
                day: "Saturday",
                slots: [
                    {
                        start: "10:00",
                        end: "11:00",
                        maxCapacity: 1
                    }
                ],
                _id: "6612c83cbfad4483b399edea"
            };
            Availability.prototype.save = jest.fn().mockResolvedValue(mockAvailability);
            await postAvailability(req, res, next);
            expect(res.status).toHaveBeenCalledWith(cons.created);
            expect(res.json).toHaveBeenCalledWith(mockAvailability);
        });
    });

    describe("getAvailability", () => {
        it("should get availability for a given date", async () => {
            const req = {
                params: {
                    date: "2022-01-01"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
            const next = jest.fn();
            const mockAvailability = {
                day: "Saturday",
                slots: [
                    {
                        start: "10:00",
                        end: "11:00",
                        maxCapacity: 1
                    }
                ],
                _id: "6612c83cbfad4483b399edea"
            };
            Availability.findOne = jest.fn().mockResolvedValue(mockAvailability);
            await getAvailability(req, res, next);
            expect(res.status).toHaveBeenCalledWith(cons.ok);
            expect(res.json).toHaveBeenCalledWith(mockAvailability.slots);
        });
    });
});