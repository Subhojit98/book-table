import mongoose, { Schema, model } from 'mongoose'

const reservationSchema = Schema({
    date: {
        type: Date,
        required: true,
    },
    timeSlots: [
        {
            time: { type: String, required: true },
            bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
            bookingId: { type: String, default: null, required: true },
        },
    ],
})

const Reservation = model("Reservation", reservationSchema)

export default Reservation