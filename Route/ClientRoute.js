import express from 'express';
import { createClient,deleteClient,getClients,updateClient } from '../Controller/ClientController.js';
import upload from '../Middleware/upload.js';

const router = express.Router();

router.post('/', upload.single('image'), createClient);
router.get('/', getClients);
router.delete('/:id', deleteClient);
router.put('/:id', upload.single('image'), updateClient);

export default router;

