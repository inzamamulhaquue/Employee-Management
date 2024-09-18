// const express = require('express');
const path = require('path');
const taskRoutes = require('./routes/taskRoute');

const express = require('express');
const cors = require('cors');
const connectdataBase = require('./config/database');
const userController = require('./controllers/userController');


const app = express();
connectdataBase();


app.use(cors());
app.use(express.json());


//import routes
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userController);


// Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Error handling middleware (optional)
app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});

// Start the server
const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});












// const express = require('express');
// const cors = require('cors');
// const connectdataBase = require('./config/database');
// const userController = require('./controllers/userController');
// const taskController = require('./controllers/taskController');


// const app = express();
// connectdataBase();

// app.use(cors());
// app.use(express.json());


// //import routes
// app.use('/api/users', userController);
// app.use('/api/tasks', taskController);



// const Port = 4004;
// app.listen(Port, () =>{
//     console.log(`server is working on ${Port}`);
// })
