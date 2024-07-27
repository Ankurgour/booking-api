import express from 'express';
import { retreats_service } from '../controllers/retreats.js';
const router = express.Router();

router.get("/retreats",retreats_service);


export default router;