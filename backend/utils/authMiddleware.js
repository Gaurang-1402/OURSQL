import jwt from 'jsonwebtoken';
import catchAsync from './catchAsync.js';
import db from '../config/db.js';

const protect = catchAsync(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;


    if (!token) {
        res.status(401);
        throw new Error('Not authorized to access this route');
    }
    try {
        // Verify token
        db.query(`SELECT * FROM USERS WHERE user_id = ${decoded.id}`, (err, results) => {
            if (err) {
                res.status(401);
                throw new Error('Not authorized to access this route');
            }
            // remove the password field from the results
            req.user= {
                user_id: results[0].user_id,
                email: results[0].email,
                is_admin: results[0].is_admin,
            };
            
            next();
        });

    } catch (err) {
        res.status(401);
        console.log("Token failed");

        throw new Error('Token failed');
    }
})

// admin middleware

const admin = (req, res, next) => {
    if (req.user && req.user.is_admin === 'Y') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}

export { protect, admin };
