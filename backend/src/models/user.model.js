import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },
    numberOfPeopleComing: {
        type: Number,
        required: true,
    },
});

const User = model("User", userSchema)

export default User
