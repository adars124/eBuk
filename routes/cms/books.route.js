const { BookCTRL } = require('../../controllers');
const multer = require('multer');
const path = require('path');

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        cb(null, `img-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage });

const express = require('express');
const router = express.Router();

router.route('/')
    .get(BookCTRL.listAll)
    .post(upload.single('image'), BookCTRL.insert)

router.route('/:id')
    .get(BookCTRL.getById)
    .put(upload.single('image'), BookCTRL.update)
    .delete(BookCTRL.delete)

module.exports = router;
