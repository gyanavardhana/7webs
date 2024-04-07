const Availability = require("../../models/Availability");
const cons = require("../../constants");


const postAvailability = async (req, res, next) => {
    const availability = new Availability({
        day: req?.body?.day,
        slots: req?.body?.slots
    });

    try {
        const newAvailability = await availability.save();
        res.status(cons.created).json(newAvailability);
    }
    catch (err) {
        next(err);
    }
}

const getAvailability = async(req,res,next) => {
    const dategiven = req?.params?.date;
    const datetaken = new Date(dategiven);
    const dayOfWeek = datetaken.toLocaleDateString('en-US', { weekday: 'long' });

    try {
        const availability = await Availability.findOne({day: dayOfWeek});
        const slots = availability?.slots;
        res.status(cons.ok).json(slots);
    }
    catch (err) {
        next(err);
    }


}

module.exports = {
    postAvailability,
    getAvailability
}