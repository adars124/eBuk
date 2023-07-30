const userRoutes = require('./users.route');
const bookRoutes = require('./books.route');

const express = require('express');
const router = express.Router();

router.use('/users', userRoutes);
router.use('/books', bookRoutes);

module.exports = router;



