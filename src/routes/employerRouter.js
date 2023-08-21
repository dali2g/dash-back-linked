import express from 'express'
import { getDB } from '../../db.js';
import { ObjectId } from 'mongodb'

const employerRouter = express.Router()
employerRouter.use(express.json())

employerRouter.post('/employee',async(req,res) =>{
    try{
        const formData = req.body;
        const db = getDB()
        const collection = db.collection('Employers');
        
        await collection.insertOne(formData)
        res.status(200).json({message : "Data saved successfully!"})



    }catch(error){
        console.log("Error saving data:",error)
        res.status(500).json({error:'An error occured while saving the data'})
    }
})

employerRouter.get('/employee',async(req,res) =>{
    try{
        const db = getDB();
        const collection = db.collection('Employers');
        const employers = await collection.find().toArray();
        res.status(200).json(employers);
    }catch(error)
    {
        console.log('Error fetching employers')
        res.status(500).json({error:"An error occured while fetching employers"});
    }
})

employerRouter.delete('/employee/:id',async(req,res) =>{
     try{
        const db = getDB()
        const collection = db.collection('Employers');
        const employerId = req.params.id;

        const result = await collection.deleteOne({_id:new ObjectId(employerId)});

        if (result.deletedCount === 1){
            res.status(200).json({message:'Employer deleted successfully'});

        } else {
            res.status(404).json({message :'Employer not found'})
        }


     }catch(error)
     {
        console.log('Error deleting employers')
        res.status(500).json({error:'An error occured while deleting employers'})
     }
})

export default employerRouter;
