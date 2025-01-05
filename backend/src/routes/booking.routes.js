import { Router } from "express"
import { checkDateAndTime, bookTable } from "../controllers/reservation.controller.js"

const router = Router()

router.route("/select-date-time-slots").post(checkDateAndTime)
router.route("/book-table").post(bookTable)

export default router