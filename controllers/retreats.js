import { Sequelize } from 'sequelize';
import Retreats from '../models/retreats.js';


export const retreats_service = async (req, res) => {
    try {
      const { filter, location, search, page = 1, limit = 10 } = req.query;
      const where = {};
  
      if (filter) {
        where.type = filter;
      }
  
      if (location) {
        where.location = location;
      }
  
      if (search) {
        where.title = {
          [Sequelize.Op.iLike]: `%${search}%`
        };
      }
  
      const retreats = await Retreats.findAll({
        where,
        offset: (page - 1) * limit,
        limit: parseInt(limit)
      });
      res.json(retreats);
    } catch (error) {
      console.error('Error fetching retreats:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  // export default router;
  