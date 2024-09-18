const Task = require('../models/taskModel');

// Controller to handle adding a new task
exports.addTask = async (req, res) => {
  try {

    console.log('Request body:', req.body); // Log to see form data
    console.log('File:', req.file); // Log to see file

    const { name, email, mobile, designation, gender, course, id } = req.body;
    const image = req.file ? req.file.path : null;

    if (!id) {
      return res.status(400).json({ success: false, message: 'User ID not found. Please SignUp' });
  }    
        const task = new Task({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image,
            userId: id
        });

        await task.save();
        return res.status(200).json({ message: 'Task added successfully', task });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to handle deleting a task
exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Controller to fetch tasks
exports.getTasks = async (req, res) => {
    const { id } = req.params;

    try {
        const tasks = await Task.find({ userId: id });
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};