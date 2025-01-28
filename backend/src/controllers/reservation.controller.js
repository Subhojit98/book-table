import asyncHandeler from '../utils/asyncHandeler.js'
import ApiError from '../utils/ApiError.js'
import ApiResponce from '../utils/ApiResponce.js'
import Reservation from '../models/reservation.model.js'
import User from '../models/user.model.js'

const checkDateAndTime = asyncHandeler(async (req, res) => {

    const { date } = req.body

    console.log(date)
    if (!date) {
        throw new ApiError(401, "Date is required!")
    }

    const reservation = await Reservation.findOne({ date })

    if (!reservation) {
        return res.status(200).json(new ApiResponce(201, {}, "no reservation found on this date"))
    }

    const reservedTimeSlots = reservation?.timeSlots.map(bookTime => bookTime?.time)

    return res.status(200)
        .json(new ApiResponce(201, reservedTimeSlots, "booked time slots"))
})


const bookTable = asyncHandeler(async (req, res) => {
    const { userDetails, date, timeSlot } = req.body;

    if (!date || !timeSlot) {
        throw new ApiError(400, "Date and timeSlot are required!");
    }

    const { firstName, lastName, email, contactNumber, numberOfPeopleComing } = userDetails;

    if (!userDetails || [firstName, lastName, email, contactNumber].some(field => !field?.trim())) {
        throw new ApiError(400, "User details are incomplete!");
    }

    const customer = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        numberOfPeopleComing,
    });

    if (!customer) {
        throw new ApiError(500, "User creation failed!");
    }

    let reservation = await Reservation.findOne({ date });

    if (!reservation) {
        reservation = await Reservation.create({
            date,
            timeSlots: [
                {
                    time: timeSlot,
                    bookedBy: customer._id,
                    bookingId: `${customer.firstName}-${customer._id}`,
                },
            ],
        });

        return res
            .status(201)
            .json(new ApiResponce(201, reservation, "Reservation created successfully!"));
    }

    const isTimeSlotBooked = reservation.timeSlots.some(
        slot => slot.time === timeSlot && slot.bookedBy !== null
    );

    if (isTimeSlotBooked) {
        throw new ApiError(400, "Time slot already booked!");
    }

    reservation.timeSlots.push({
        time: timeSlot,
        bookedBy: customer._id,
        bookingId: `${customer.firstName}-${customer._id}`,
    });

    await reservation.save();

    return res
        .status(201)
        .json(new ApiResponce(201, reservation, "Reservation created successfully!"));
});

export { checkDateAndTime, bookTable }