const { showError } = require("../libs");
const { Book } = require('../models');
const { unlinkSync } = require('node:fs');

class BooksController {
    listAll = async (req, res, next) => {
        try {
            const books = await Book.find();

            res.json(books);
        } catch(err) {
            showError(err, next);
        }
    };

    insert = async (req, res, next) => {
        try {
            const { name, description, author, status } = req.body;

            const imagePath = req.file ? req.file.filename : '';

            const newBook = await Book.create({
                name, description, author, imagePath, status
            });

            res.status(201).json({
                success: 'Book published!!',
                newBook
            });
        } catch(err) {
            showError(err, next);
        }
    };

    getById = async (req, res, next) => {
        try {
            const book = await Book.findById(req.params.id);

            if(!book)
                return res.status(404).json({
                    message: 'Book not found!!'
                });

            res.json(book);
        } catch (err) {
            showError(err, next);
        }
    };

    update = async (req, res, next) => {
        try {
            const { name, description, author, status } = req.body;

            const book = await Book.findById(req.params.id);

            if(!book)
                return res.status(404).json({
                    message: 'Book not found!!'
                });
            
            let imagePath;

            if(req.file) {
                imagePath = req.file.filename;

                if(book.imagePath.length) {
                    unlinkSync(`images/${book.imagePath}`);
                }
            } else {
                imagePath = book.imagePath;
            }

            const newBook = await Book.findByIdAndUpdate(req.params.id, {
                name, description, author, status, imagePath
            });

            res.json({
                success: 'Book updated successfully!!',
                newBook
            })
        } catch (err) {
            showError(err, next);
        }
    };

    delete = async (req, res, next) => {
        try {
            const book = await Book.findById(req.params.id);
            
            if(book.imagePath.length) {
                unlinkSync(`images/${book.imagePath}`);
            }

            const deletedBook = await Book.findByIdAndDelete(req.params.id);

            res.json({
                success: 'Book deleted successfully!!',
                deletedBook
            });
        } catch (err) {
            showError(err, next);
        }
    };
}

module.exports = new BooksController;