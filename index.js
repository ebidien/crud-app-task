const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const contactsRoute = require('./routes/contacts');

const app = express();
const port = process.env.port || 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/contacts',contactsRoute);

//Connect to MongoDB Atlas
const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("MongoDB Atlas database connection established successfully.");
}).catch(error => {
    console.log("Something went wrong:", error);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`)
});