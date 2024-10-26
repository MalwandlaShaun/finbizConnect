// routes/userRoutes.js
import express from 'express';
import { getUserById, createUser } from './firebase.controller.js';

const router = express.Router();

router.get('/user/:id', getUserById);
router.post('/user', createUser);

export default router;
