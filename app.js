const express = require('express');
const app = express();
const connectDB = require('./config/db.js')
const cors = require('cors');


require('dotenv').config(); //load env

//routes
const userRoutes = require('./routes/userRoute.js');
const errorHandler = require('./middleware/errorHandler.js');

connectDB(); //connect to database

//global middlewares
app.use(cors());
app.use(express.json()) // parse json request body

//health check route(for testing)
app.get('/',(req,res)=>{
    res.json("Api is running")
})

app.use('/api/users',userRoutes); //this route will handle all user related requests

//central error handler:all errors forwarded here
app.use(errorHandler);

//start server
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{})
    console.log(`Server running on port ${PORT}`);
