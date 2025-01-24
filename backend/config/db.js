const mongoose = require('mongoose');

function connectDB() {
   mongoose.connect(process.env.MONGO_URI)
   .then(() => console.log('Connected to MongoDB '+ process.env.MONGO_URI))
   .catch(err => console.log(err));
}

module.exports = connectDB;
