import express from 'express';
import { bookings } from '../controllers/booking.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/booking",isAuthenticated,bookings);
export default router;