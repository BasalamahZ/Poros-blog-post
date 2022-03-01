const express = require("express");
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8000;
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/users");
const postRoute = require("./Routes/posts");
const categoryRoute = require("./Routes/categories");

require('dotenv/config');
app.use(express.json());

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Connceting to Database
Mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true }, 
    () => console.log('Database Connected')
);

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);

// Start Server
app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
})