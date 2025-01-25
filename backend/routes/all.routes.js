const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const captainRoutes = require('./captain.routes');

router.use('/users', userRoutes);
router.use('/captain', captainRoutes);

router.get('/', (req, res) => {
   res.send('Server is spinning up!');
})

module.exports = router;