const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Published', 'Draft'],
        default: 'Published',
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
});

const Book = model('Book', bookSchema);

module.exports = Book;