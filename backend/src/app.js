import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    allowedHeaders: ['Content-Type', "Authorization"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))


app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ limit: "16kb", extended: true }))




import bookingRoutes from '../src/routes/booking.routes.js'
app.use("/api/v1/table-booking", bookingRoutes)
export { app }
