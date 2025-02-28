const express = require('express');
const router = express.Router();

const userRoutes = require('./user.routes');
const captainRoutes = require('./captain.routes');
const mapRoutes = require('./map.routes');
const rideRoutes = require('./ride.routes')

router.use('/users', userRoutes);
router.use('/captain', captainRoutes);
router.use('/map', mapRoutes);
router.use('/rides', rideRoutes);

router.get('/', (req, res) => {
   res.send('Server is spinning up!');
})

module.exports = router;