import jwt from 'jsonwebtoken';
import catchAsync from './catchAsync.js';
import {dbAdmin} from '../config/db.js';

const protect = catchAsync(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;

    if (!token) {
        res.status(401);
        throw new Error('Not authorized to access this route');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Verify token
        const query = `SELECT * FROM USERS WHERE user_id = ${decoded.id}`;
        const results = await dbAdmin.query(query);

        // The user is the first element of the first array in results
        const user = results[0][0];

        // remove the password field from the results
        req.user = {
            user_id: user.user_id,
            email: user.email,
            is_admin: user.is_admin,
        };

        next();

    } catch (err) {
        res.status(401);
        throw new Error('Not authorized to access this route');
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
