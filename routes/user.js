import express from 'express';
import { login, newUser } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router = express.Router();

router.post('/signup', newUser);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Log in a user with username and password.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username of the user.
 *               password:
 *                 type: string
 *                 description: Password of the user.
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post("/login",login);


export default router;