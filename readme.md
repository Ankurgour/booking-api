
# Booking API

This is a Node.js API for booking services, using Express.js, Sequelize, and PostgreSQL.

## Prerequisites

Ensure you have the following installed:

- Node.js (v18.17.0 or later)
- npm (v8.0.0 or later)
- PostgreSQL database (local or hosted)

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Ankurgour/booking-api.git
cd booking-api
```

### Install Dependencies

```bash
npm install
```

### Configuration

Create a `.env` file in the root directory of the project and set the following environment variables:

```
PGUSER=ankur123
PGHOST=dpg-cqic89aj1k6c739c4il0-a.oregon-postgres.render.com
PGDATABASE=retreats_service
PGPASSWORD=OfbmuGddeqDDpCoUHcoVS4qbel7jh3Kc
PGPORT=5432
DATABASE_URL=postgresql://ankur123:OfbmuGddeqDDpCoUHcoVS4qbel7jh3Kc@dpg-cqic89aj1k6c739c4il0-a.oregon-postgres.render.com/retreats_service
SECRET_KEY=ankurisagoodboy 
WORKINGURL = https://booking-api-ffn0.onrender.com
set all this things in that file
### Database Setup

To set up the database, you need to run migrations and seeders. Sequelize CLI is used for this purpose.

#### Running Migrations

```bash
npx sequelize-cli db:migrate
```

#### Running Seeders

```bash
npx sequelize-cli db:seed:all
```

### Running the Application

To start the server in development mode, use:

```bash
nodemon index.js
```

This will start the server on `http://localhost:3000`.

### Testing the Database Connection

To test the database connection, you can use the following script:

```bash
node ./config/test-db-connection.js
```

### API Documentation

API documentation is available using Swagger. Once the server is running, you can access the documentation at:

```
http://localhost:3000/api-docs
and also by the given depoloyed link:-https://booking-api-ffn0.onrender.com/
```

### Project Structure

- `config/`: Configuration files, including database connection and Swagger setup.
- `models/`: Sequelize models for database tables.
- `controllers/`: Controllers for handling API requests.
- `routes/`: Route definitions for the API.
- `middlewares/`: Custom middleware functions.
- `config/test-db-connection.js`: Script to test the database connection.

## Additional Dependencies

The project includes the following additional dependencies:

- `axios`: "^1.7.2"
- `bcrypt`: "^5.1.1"
- `body-parser`: "^1.20.2"
- `cookie-parser`: "^1.4.6"
- `cors`: "^2.8.5"
- `dotenv`: "^16.4.5"
- `express`: "^4.19.2"
- `jsonwebtoken`: "^9.0.2"
- `nodemon`: "^3.1.4"
- `pg`: "^8.12.0"
- `pg-hstore`: "^2.3.4"
- `sequelize`: "^6.37.3"
- `sequelize-cli`: "^6.6.2"
- `swagger-jsdoc`: "^6.2.8"
- `swagger-ui-express`: "^5.0.1"

