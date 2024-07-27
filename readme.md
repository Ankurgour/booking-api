# Retreat Service API

## Description

The Retreat Service API is designed to manage user registrations, authenticate users, retrieve retreat information, and handle bookings. This README provides setup instructions, environment configuration, and details about the available API routes.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [API Routes](#api-routes)
   - [User Routes](#user-routes)
   - [Retreat Routes](#retreat-routes)
   - [Booking Routes](#booking-routes)
4. [Running the Application](#running-the-application)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/retreat-service.git
   cd retreat-service

Install dependencies:
bash
Copy code
npm install
Configuration
Create a .env file in the root directory with the following content:

env
Copy code
# PostgreSQL Database URL
DATABASE_URL=postgres://username:password@localhost:5432/your_database

# JWT Secret for authentication
JWT_SECRET=your_jwt_secret

# Port for the server
PORT=3000
DATABASE_URL: The connection string for your PostgreSQL database. Replace username, password, localhost, 5432, and your_database with your actual database credentials and details.
JWT_SECRET: A secret key used for signing JWT tokens. Make sure to use a strong and unique value.
PORT: The port on which your server will run. You can change this if needed.
API Routes
User Routes
User Registration (Sign Up)

Endpoint: POST /signup
Description: Creates a new user.
Request Body:
json
Copy code
{
  "username": "string",
  "password": "string",
  "email": "string",
  "phone": "integer"
}
Responses:
201 Created: User created successfully with a JWT token.
400 Bad Request: Missing or invalid fields.
500 Internal Server Error: Server error or duplicate fields.
User Login

Endpoint: POST /login
Description: Authenticates a user and returns a JWT token.
Request Body:
json
Copy code
{
  "username": "string",
  "password": "string"
}
Responses:
200 OK: Authentication successful with a JWT token.
400 Bad Request: Invalid credentials.
404 Not Found: User not found.
500 Internal Server Error: Server error.
Retreat Routes
Retrieve Retreats
Endpoint: GET /retreats
Description: Retrieves a list of retreats with optional filters and pagination.
Query Parameters:
filter: Filter retreats by type.
location: Filter retreats by location.
search: Search retreats by title or description.
page: Page number for pagination (default: 1).
limit: Number of items per page (default: 10).
Responses:
200 OK: List of retreats.
500 Internal Server Error: Server error.
Booking Routes
Create Booking
Endpoint: POST /booking
Description: Creates a new booking for a retreat.
Request Body:
json
Copy code
{
  "retreat_id": "integer",
  "payment_details": "string",
  "booking_date": "string"
}
Responses:
201 Created: Booking created successfully.
400 Bad Request: Booking already exists for the same user and date.
500 Internal Server Error: Server error.
Running the Application
Start the server:

bash
Copy code
npm start
By default, the server will run on port 3000. You can change this in the .env file if needed.

Access the API documentation:
Open your browser and navigate to http://localhost:3000/api-docs to view and test the API using Swagger UI.#   b o o k i n g - a p i  
 #   b o o k i n g - a p i  
 