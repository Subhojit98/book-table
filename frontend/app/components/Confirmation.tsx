"use client"
import { useContext } from "react"
import { AppContext } from "../context/ContextProvider"

const Confirmation = () => {

    const context = useContext(AppContext)



    if (!context) {
        throw new Error('AppContext is not provided.')
    }

    const { bookingId } = context

    return (
        <div className='mt-28 flex flex-col gap-y-5 items-center text-center text-white px-3'>

            <h1 className='text-3xl font-thin'>Thak you for chooseing us.</h1>
            <h2 className='text-lg text-yellow-400'>Your booking for 16 dec 2024 on 2:00pm with has been booked successfully.</h2>

            <h3 className="text-xl font-bold text-lime-500">Booking ID: {bookingId}</h3>
            <h3 className='text-xl font-semibold'>We will be waiting to server you soon!</h3>
        </div>
    )
}

export default Confirmation
