// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import dotenv, { configDotenv } from 'dotenv';
import cors from 'cors';
import Retreatrouter from "./routes/retreats.js";
import BookingRouter from "./routes/bookings.js";
import config from './config/config.json' assert { type: 'json' };
import userRoutes from "./routes/user.js";
import sequelize from './config/database.js';
import cookieParser from 'cookie-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from './swaggerDef.js';


const env = process.env.NODE_ENV || 'development';
 // Check if config is correctly loaded

// Initialize dotenv to read .env file
dotenv.config();
configDotenv();


const app = express();
app.use(cors({
  origin: ["http://localhost:3000", "https://booking-api-ffn0.onrender.com"],
}));
app.use(cookieParser());
app.use(bodyParser.json());
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], 
};
const swaggerSpec = swaggerJsdoc(options);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.json());
const dbConfig = config[env];

console.log('Database Config:', dbConfig);
sequelize.sync({ alter: true }).then(() => {
  console.log("All models were synchronized successfully.");
}).catch(err => {
  console.error('Error syncing models:', err);
});
// GET /retreats - Fetch all available retreats
app.use(userRoutes);
app.use("/api",Retreatrouter);
// POST /book - Create a new booking
app.use("/api",BookingRouter);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
