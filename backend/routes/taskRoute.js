const express = require('express');
const { addTask, deleteTask, getTasks } = require('../controllers/taskController');
const upload = require('../middleware/multerConfig');

const router = express.Router();

// Route to add a new task with file upload
router.post('/addTask', upload.single('image'), addTask);

// Route to delete a task
router.delete('/deleteTask/:id', deleteTask);

// Route to get tasks
router.get('/getTasks/:id', getTasks);

module.exports = router;
