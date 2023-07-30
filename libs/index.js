const { User } = require("../models");
const jwt = require('jsonwebtoken');

const showError = (err, next) => {
    console.log(err);
    next({
        message: 'Processing error!!!',
        status: 400
    });
};

const auth = async (req, res, next) => {
    if( 'authorization' in req.headers ) {
        const token = req.headers.authorization.split(' ')[1];
        
            try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(payload.id);

            // if user exists
            if(user) {
                if(user.status) {
                    req.user = user;
                    next();
                } else {
                    next({
                        message: 'Invalid user!!',
                        status: 403,
                    });
                }
            } else {
                next({
                    message: 'Invalid token!!',
                    status: 401,
                });
            }
        }catch (err) {
             next({
                 message: 'Invalid token!!',
                 status: 401,
             });
         }
    } else {
        next({
            message: 'Token is missing!!',
            status: 401,
        });
    }
};

const admin = (req, res, next) => {
    if('user' in req) {
        if(req.user.userType === 'admin') {
            next();
        } else {
            next({
                message: 'Not a adminnn!!! You don\'t have the privilage!!',
                status: 403,
            });
        }
    } else {
        next({
            message: 'Login first!!',
            status: 401,
        });
    }
}


module.exports = { showError, auth, admin };