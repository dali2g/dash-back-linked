import express from 'express';
import { getDB } from '../../db.js';

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/responsables', async (req, res) => {
  try {
    const formData = req.body;
    const db = getDB();
    const collection = db.collection('Responsables');

    await collection.insertOne(formData);
    console.log('Data inserted');

    res.status(200).json({ message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'An error occurred while saving the form data.' });
  }
});

export default userRouter;
