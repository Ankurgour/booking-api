import { Sequelize } from 'sequelize';
import Retreats from '../models/retreats.js';

/**
 * @swagger
 * /retreats:
 *   get:
 *     summary: Retrieve a list of retreats
 *     description: Fetches a list of retreats based on optional filters such as type, location, and search query. Supports pagination.
 *     tags: [Retreats]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter retreats by type
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter retreats by location
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search retreats by title or description
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A list of retreats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Retreat'
 *       500:
 *         description: Internal Server Error
 */
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
  