 
import { Router } from 'express';

const router = Router({mergeParams: true});

// const Task = taskInit(sequelize, DataTypes);

const someshit = [1, 2, 'fuck you', 4, 5];


router.get('/todos', (req, res) => {
    try {
      let shitty_object = [];
  
      for (const [index, item] of someshit.entries()) {
        shitty_object.push({ id: index, message: item });
      }
      res.json(shitty_object);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ message: 'Internal Server Error' }); 
    }
  });
  
  
router.get('/todos/:id', (req, res) => {
    try {
      const { id } = req.params;
      const index = parseInt(id); 
  
  if (isNaN(index) || index < 0 || index >= someshit.length) {
        return res.status(400).json({ message: 'Invalid todo ID' });
      }
  
      const shitty_object = { id: index, message: someshit[index] };
      res.json(shitty_object);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  router.post('/todos', (req, res) => {
    try {
      let { title, status } = req.body;
  
  
      if (!title) {
        return res.status(400).json({ message: 'Title is required' }); 
      }
  
  
      if (title.length > 100) {
        return res.status(400).json({ message: 'Title is too long (max 100 characters)' });
      }
  
  
      const allowedStatuses = ['Not started', 'In progress', 'Completed'];
      status = status ?? 'Not started'; 
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      someshit.push(title);
      res.status(201).json({ title: title, status: status }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  router.put('/todos/:id', (req, res) => {
    try {
      const { id } = req.params;
      const index = parseInt(id);
  
      if (isNaN(index) || index < 0 || index >= someshit.length) {
        return res.status(400).json({ message: 'Invalid todo ID' });
      }
  
      let { title, status } = req.body;
  
      if (!title) {
          return res.status(400).json({ message: 'Title is required' });
      }
  

      if (title.length > 100) {
          return res.status(400).json({ message: 'Title is too long (max 100 characters)' });
      }
  
      const allowedStatuses = ['Not started', 'In progress', 'Completed'];
  
      if (!allowedStatuses.includes(status)) {
          return res.status(400).json({ message: 'Invalid status' });
      }
  
      someshit[index] = title;
      res.json({ id: index, title: title, status: status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  router.patch('/todos/:id', (req, res) => {
    try {
      const { id } = req.params;
      const index = parseInt(id);
  
      if (isNaN(index) || index < 0 || index >= someshit.length) {
        return res.status(400).json({ message: 'Invalid todo ID' });
      }
  
      let { status } = req.body;
  
      const allowedStatuses = ['Not started', 'In progress', 'Completed'];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }

      res.json({ id: index, title: someshit[index], status: status });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  router.delete('/todos/:id', (req, res) => {
    try {
      const { id } = req.params;
      const index = parseInt(id);
  
      if (isNaN(index) || index < 0 || index >= someshit.length) {
        return res.status(400).json({ message: 'Invalid todo ID' });
      }
  
      someshit.splice(index, 1);
      res.json({ message: 'Todo successfully deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

export default router;