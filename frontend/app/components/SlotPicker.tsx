"use client"
import { useContext, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { AppContext } from '../context/ContextProvider';

interface Slot {
    time: string;
    isBooked: boolean;
}
const SlotPicker = () => {
    const [slot, setSlot] = useState([
        { time: "12:00 - 2:00pm", isBooked: false },
        { time: "2:00 - 4:00pm", isBooked: false },
        { time: "4:00 - 6:00pm", isBooked: false },
        { time: "6:00 - 8:00pm", isBooked: false },
        { time: "8:00 - 10:00pm", isBooked: false },
        { time: "10:00 - 12:00am", isBooked: false },
    ])
    const [isTimeSlotSelected, setIsTimeSlotSelected] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const context = useContext(AppContext)

    if (!context) {
        throw new Error('AppContext is not provided.')
    }
    const { setCurrentPage, userDetails, setBookingId } = context

    const isToday = (date: Date) => {
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        )
    }

    const disablePastDates = ({ date, view }: { date: Date, view: string }) => {
        if (view === 'month') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
        }
        return false;
    };
    const tileClassName = ({ date, view }: { date: Date, view: string }) => {
        const today = new Date();
        if (view === 'month') {
            if (isToday(date)) {
                return 'bg-blue-500 text-white'
            }

            if (date < today) {
                return "bg-red-500 text-white cursor-not-allowed"
            }
            return 'hover:bg-green-600 hover:text-white'
        }
        return '';
    };

    const getTimeSlots = async (d: Date) => {
        const date = d.toISOString()
        const URL = "https://book-table-svhz.onrender.com/api/v1/table-booking/select-date-time-slots"
        try {

            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ date })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`)
            }

            const data = await res.json()
            return data

        } catch (error) {
            console.error("Error finding date and slots:", error)
        }
    }

    const createBooking = async (userDetails: object, date: Date, timeSlot: string) => {

        try {
const URL = "https://book-table-svhz.onrender.com/api/v1/table-booking/book-table
            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userDetails,
                    date,
                    timeSlot
                })
            })

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json()
            console.log("Booking created:", data);

            setTimeout(() => {
                setBookingId(data?.bookingId)
                setCurrentPage(3)
            }, 3000)

        } catch (error) {
            console.log("Error creating booking:", error);
        }

    }

    const updateSlotsStatus = (fetchedSlots: string[]) => {

        console.log(fetchedSlots)
        const updatedSlots = slot.map((s: Slot) => {

            if (fetchedSlots.includes(s.time)) {
                return { ...s, isBooked: true }
            }
            return { ...s, isBooked: false }
        });

        setSlot(updatedSlots);
    };


    const handleTimeSlotSelection = async (value: Date) => {
        setIsTimeSlotSelected(true);
        setSelectedDate(value)
        const response = await getTimeSlots(value)
        if (response?.data?.length > 0) {
            setSelectedTimeSlot(response?.data)
        }
        else {
            setSelectedTimeSlot([])
        }
    };



    useEffect(() => {
        updateSlotsStatus(selectedTimeSlot)
    }, [selectedTimeSlot])


    return (
        <div className='w-full h-full flex flex-col items-center px-2 sm:px-4'>
            <div className="text-center text-white mt-4">
                <h1 className="text-2xl font-bold">Reservation Slot</h1>
                <p className="text mt-2">Please select the reservation date & time slots</p>
            </div>
            {!isTimeSlotSelected && <div className="flex justify-center items-center mt-5">
                <div className="bg-white shadow-lg rounded-lg p-6 mx-auto">
                    <Calendar
                        onChange={(val) => handleTimeSlotSelection(val as Date)}
                        value={selectedDate}
                        className="custom-calendar"
                        tileClassName={tileClassName}
                        tileDisabled={disablePastDates}
                    />
                </div>
            </div>}
            {/* time slots -> */}
            {isTimeSlotSelected && slot && <div className="w-full h-1/2 grid grid-cols-3 gap-x-3 gap-y-3 mt-14 text-white">
                {
                    slot.map((slot, i) => (
                        <button key={i} className='bg-transparent hover:scale-105 hover:duration-200 ease-out hover:shadow-[0_20px_50px_rgba(13,_255,_13,_0.5)] border border-white disabled:border-none disabled:opacity-55 disabled:line-through disabled:bg-red-500 disabled:shadow-none disabled:scale-100' disabled={slot.isBooked}
                            onClick={() => createBooking(userDetails, selectedDate, slot.time)}
                        >{slot.time}</button>
                    ))
                }
            </div>}

            {isTimeSlotSelected && <button className='bg-red-500 text-white mt-8 p-3 px-5 rounded-lg hover:bg-red-600' onClick={() => setIsTimeSlotSelected(false)}>Go Back</button>}
        </div>

    )
}

export default SlotPicker
