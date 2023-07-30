const jwt = require('jsonwebtoken');
const { showError } = require('../libs');
const { User } = require('../models');
const bcrypt = require('bcryptjs');

class LoginController {
    check = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            // check if user exists
            const user = await User.findOne({ email });

            // if user exists
            if(user) {

                // check the password!
                if(bcrypt.compareSync(password, user.password)){
                    // generate token
                    const token = jwt.sign({
                        id: user._id,
                        iat: Math.floor(Date.now() / 1000),
                        exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
                    }, process.env.JWT_SECRET);

                    res.json({
                        token, user
                    });
                } else {
                    next({
                        message: 'Invalid username or password!!',
                        status: 422,
                    });
                }
                
            } else {
                next({
                    message: 'Invalid username or password!!',
                    status: 422,
                });
            }
        } catch (err) {
            showError(err, next);
        }
    };

    addUser =  async (req, res, next) => {
        try {
            const { name, email, password, userType } = req.body;

            const user = await User.findOne({ email });

            // Check if user already exists
            if(user)
                return res.status(403).json({
                    message: 'User already exists!'
                });
            
            // ENCRYPT the password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            const newUser = await User.create({
                name,
                email,
                password: hash,
                userType
            });

            res.status(201).json({
                success: 'User created successfully!',
                newUser
            });

        } catch (err) {
            showError(err, next);
        }
    };
}

module.exports =  new LoginController;