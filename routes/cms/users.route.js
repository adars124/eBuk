const { UserCTRL } = require('../../controllers');

const express = require('express');
const router = express.Router();

router.route('/')
    .get(UserCTRL.listAll)

router.route('/:id')
    .get(UserCTRL.getUserById)
    .put(UserCTRL.update)
    .delete(UserCTRL.delete)

module.exports = router;