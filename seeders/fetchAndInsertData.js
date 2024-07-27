import axios from 'axios';
import Retreats from '../models/retreats.js';
import sequelize from '../config/database.js';

async function fetchAndInsertData() {
  try {
    // Fetch data from the API
    const response = await axios.get('https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats');
    const retreatsData = response.data;
    // console.log(retreatsData);
    // Sync the database structure (optional, can be removed if tables are already created)
    await sequelize.sync();

    // Transform data if necessary
    // For example, if your API response keys don't match your model fields
    const transformedData = retreatsData.map(retreat => ({
      title: retreat.title,
      description: retreat.description,
      date: retreat.date,
      location: retreat.location,
      price: retreat.price,
      type: retreat.type,
      condition: retreat.condition,
      image: retreat.image,
      tag: retreat.tag,
      duration: retreat.duration,
    }));
    // console.log("kaalu",transformedData);

    await Retreats.bulkCreate(transformedData, {
      updateOnDuplicate: ['title', 'description', 'date', 'location', 'price', 'type', 'condition', 'image', 'tag', 'duration'],
    });

    console.log('Data fetched and inserted successfully');
  } catch (error) {
    console.error('Error fetching or inserting data:', error);
  } finally {
    try {
      await sequelize.close();
    } catch (closeError) {
      console.error('Error closing database connection:', closeError);
    }
  }
}

// fetchAndInsertData();
