const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// The URL to our Mongo Cluster
const uri = process.env.ATLAS_URI;
// Connect to the DB
// The parameters handle deprecation
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
// Once connected, message it
connection.once('open', () => {
    console.log("\nMongo DB connection has been sucessfully established");
});

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Start the server on the port
app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`);
});