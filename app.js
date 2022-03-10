const express = require("express");
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hbs = require('express-handlebars');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 5000;
const authRoute = require("./Routes/auth");
const postRoute = require("./Routes/posts");
require('dotenv/config');

//view engine setup
app.engine('hbs', hbs.engine({extname: '.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true}));

//image
const storage = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null, './public/uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
})

const upload = multer({
    storage:storage,
    limists:{
        fieldSize: 1024 * 1024 * 3
    },
})

// Connceting to Database
Mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true }, 
    () => console.log('Database Connected')
);

// Routes
app.use('/', postRoute);
app.use('/auth/', authRoute);


// Start Server
app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
})