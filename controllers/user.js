import bcrypt from 'bcrypt';
import { User } from '../models/user.js'; 
import { sendToken } from '../utils/features.js';
// import { sendToken } from '../utils/jwtToken.js';
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user by providing the required details.
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
 *               - email
 *               - phone
 *             properties:
 *               username:
 *                 type: string
 *                 description: Unique username for the user.
 *               password:
 *                 type: string
 *                 description: Password for the user.
 *               email:
 *                 type: string
 *                 description: User's email address.
 *               phone:
 *                 type: integer
 *                 description: User's phone number.
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
const newUser = async (req, res) => {
  try {
    const { username, password, email, phone } = req.body;
    // console.log( username, password, email, phone ); 

    if (!username || !password || !email || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

   

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      phone,
    });

    sendToken(res, user, 201, "User Created Successfully");

  } catch (error) {
    console.error(error);

    if (error.name === 'SequelizeUniqueConstraintError') {
      const field = error.errors[0].path;
      const errMsg = `Duplicate field: ${field}`;
      return res.status(400).json({ success: false, message: errMsg });
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
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

const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ where: { username } });
  
      if (!user) {
        return res.status(404).json({ message: "Invalid username or password" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }
  
      const { id, username: userUsername, email, phone, createdAt, updatedAt } = user;
      const sanitizedUser = { id, username: userUsername, email, phone, createdAt, updatedAt };
      // console.log("san",sanitizedUser);
      sendToken(res, sanitizedUser, 200, `Welcome ${user.username}`);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

export { newUser,login };
