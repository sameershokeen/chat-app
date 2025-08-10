import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { getAllUsers, getmessages, sendmessages } from '../controller/message.controller.js';

const router = express.Router();

router.get('/users',protectRoute,getAllUsers);
router.get('/:id', protectRoute,getmessages);
router.get('/send/:id', protectRoute, sendmessages);
export default router;