const { Book } = require('../models');
const { showError } = require('../libs');

class FrontController {
    displayAll = async (req, res, next) => {
        try {
            const books = await Book.find();

            res.json(books);
        } catch(err) {
            showError(err, next);
        }
    };

    displayById = async (req, res, next) => {
        try {
            const book = await Book.findById(req.params.id);

            if(!book) {
                return res.status(404).json({
                    message: 'Book not found!',
                });
            }

            res.json(book);
        } catch(err) {
            showError(err, next);
        }
    };
}

module.exports = new FrontController;