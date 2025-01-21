const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');

router.use('/users', userRoutes);

router.get('/', (req, res) => {
   res.send('Server is spinning up!');
})

module.exports = router;