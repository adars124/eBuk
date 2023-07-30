const { FrontCTRL } = require('../../controllers');

const express = require('express');
const router = express.Router();

router.get('/books', FrontCTRL.displayAll);
router.get('/books/:id', FrontCTRL.displayById);

router.get('/images/:filename', async (req, res, next) => {
    res.sendFile(`images/${req.params.filename}`, { root: './' });
});

module.exports = router;

