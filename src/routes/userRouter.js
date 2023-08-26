import express from 'express';
import { getDB } from '../../db.js';
import { ObjectId } from 'mongodb';

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
userRouter.get('/profils', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('Responsables');

    // Fetch the data from the 'Responsables' collection
    const responseData = await collection.find({}).toArray();

    // Send the data as JSON
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error fetching profils data:', error);
    res.status(500).json({ error: 'An error occurred while fetching profils data.' });
  }
});


userRouter.get('/responsables', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('Responsables');

    const users = await collection.find().toArray();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

userRouter.delete('/responsables/:id', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('Responsables');

    const userId = req.params.id;

    const result = await collection.deleteOne({ _id: new ObjectId(userId) });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
});

userRouter.put('/responsables/:id', async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection('Responsables');
    const userId = req.params.id;
    
    const updatedUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender:req.body.gender,
      phone:req.body.phone,
      matricule:req.body.matricule
    };
    
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: updatedUser }
    );
    
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'User updated successfully' });
    } else {
      res.status(404).json({ error: 'An error occurred while updating the user' });
    }
  } catch (error) {
    console.log('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
});
userRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDB();
    const collection = db.collection('Responsables');

    const user = await collection.findOne({ email });

    if (user && user.password === password) {
      // Successfully authenticated
      res.status(200).json({
        message: 'Login successful',
        user: {
          email: user.email,
          password: user.password,
          // Include other user details here
        },
      });
    } else {
      // Authentication failed
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});
export default userRouter;
