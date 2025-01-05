import dotenv from 'dotenv'
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path: './env'
})

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log("error: ", error)
        })
        app.listen(process.env.PORT || 8002, () => {
            console.log(`server is running on port: ${process.env.PORT || 8002}`)
        })
    })
    .catch((err) => {
        console.log(`Mongodb connection error: ${err}`)
    })