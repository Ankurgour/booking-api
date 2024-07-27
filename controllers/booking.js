import express  from 'express';
import Booking from '../models/bookings.js';
import { User } from '../models/user.js';
import Retreats from '../models/retreats.js';
import { Op } from 'sequelize';


/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *           description: ID of the user making the booking.
 *         user_name:
 *           type: string
 *           description: Name of the user.
 *         user_email:
 *           type: string
 *           description: Email of the user.
 *         user_phone:
 *           type: string
 *           description: Phone number of the user.
 *         retreat_id:
 *           type: integer
 *           description: ID of the retreat being booked.
 *         retreat_title:
 *           type: string
 *           description: Title of the retreat.
 *         retreat_location:
 *           type: string
 *           description: Location of the retreat.
 *         retreat_price:
 *           type: number
 *           description: Price of the retreat.
 *         retreat_duration:
 *           type: string
 *           description: Duration of the retreat.
 *         payment_details:
 *           type: string
 *           description: Payment details for the booking.
 *         booking_date:
 *           type: string
 *           format: date
 *           description: Date of the booking.
 */

/**
 * @swagger
 * /booking:
 *   post:
 *     summary: Create a new booking
 *     description: Create a booking for a retreat. Authentication is required.
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - retreat_id
 *               - payment_details
 *               - booking_date
 *             properties:
 *               retreat_id:
 *                 type: integer
 *                 description: ID of the retreat to book.
 *               payment_details:
 *                 type: string
 *                 description: Payment details for the booking.
 *               booking_date:
 *                 type: string
 *                 format: date
 *                 description: Date of the booking.
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: This retreat is already booked for the user on the specified date
 *       500:
 *         description: Internal Server Error
 */
export const bookings = async (req, res) => {
  try {
    const  user_id = req.user; // From token
    const user = await User.findOne({
      where:{
        id:user_id}
    });
    const {username,email,phone} = user;
    const { retreat_id,payment_details,booking_date } = req.body;
    const retreatDetails = await Retreats.findOne({
      where:{id:retreat_id}
    });

    // Check if the retreat is already booked for the same user on the same date
    const existingBooking = await Booking.findOne({
      where: {
        user_id,
        retreat_id,
        booking_date: {
          [Op.eq]: booking_date,
        },
      },
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'This retreat is already booked for the user on the specified date.' });
    }

    // Create a new booking
    const booking = await Booking.create({
      user_id,
      user_name:username,
      user_email:email,
      user_phone:phone,
      retreat_id,
      retreat_title:retreatDetails.title,
      retreat_location:retreatDetails.location,
      retreat_price:retreatDetails.price,
      retreat_duration:retreatDetails.duration,
      payment_details,
      booking_date:booking_date,
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
  }