import express from 'express';
import sequelize from './config/database.js';
import User from './models/user.js'; // Import other models similarly

const app = express();

// Other middleware and routes

(async () => {
  try {
    // Sync all models that aren't already in the database
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
    
    // Start the server
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error("An error occurred while synchronizing the models:", error);
  }
})();
