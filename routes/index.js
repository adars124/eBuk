const { LoginCTRL } = require('../controllers');
const { auth, admin } = require('../libs');
const cmsRoutes = require('./cms');
const frontRoutes = require('./front');

const express = require('express');
const router = express.Router();

router.use('/cms', auth, admin, cmsRoutes);
router.use('/front', frontRoutes);
router.post('/login', LoginCTRL.check);
router.post('/register', LoginCTRL.addUser);

// to get the info of logged in user!
router.get('/user/details', (req, res, next) => {
    res.json(req.user);
})

module.exports = router;