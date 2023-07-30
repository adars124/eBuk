const { User } = require('../models'); // for the models
const bcrypt = require('bcryptjs');
const { showError } = require('../libs');

class UsersController {
    // SELECT * FROM users;
    listAll = async (req, res, next) => {
        try {
            const users = await User.find(); // gets all the data from the users collection
            res.json(users);
        } catch (err) {
            showError(err, next);
        }
    };

    getUserById = async (req, res, next) => {
        try {
            const id = req.params.id;

            const user = await User.findById(id);

            if(!user)
                return res.status(404).json({
                    message: 'User not found!!'
                })
            
            res.json(user);
        } catch (err) {
            showError(err, next);
        }
    };

    update = async (req, res, next) => {
        try {
            const { name, email, password, userType } = req.body;

            // encryption of password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                name, email, password: hash, userType
            });

            res.json({
                success: 'User updated successfully!',
                updatedUser
            });
        } catch (err) {
            showError(err, next);
        }
    };

    delete = async (req, res, next) => {
        try {
            const id = req.params.id;

            const deletedUser = await User.findByIdAndDelete(id);

            res.json({
                success: 'User deleted successfully!',
                deletedUser
            });
        } catch (err) {
            showError(err, next);
        }
    };
}

module.exports = new UsersController;