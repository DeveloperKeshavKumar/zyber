const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const router = require('./routes/all.routes')
const app = express();

connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', router);

module.exports = app;