import catchAsync from '../utils/catchAsync.js'
import { dbAdmin } from '../config/db.js';
import bcrypt from 'bcryptjs'
import generateTokenSetCookie from '../utils/generateTokenSetCookie.js'

import { v4 as uuidv4 } from 'uuid';

const checkPassword = async (enteredPassword, userPassword) => {
    return await bcrypt.compare(enteredPassword, userPassword)
}

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: 'Email and password are required',
        });
        return;
    }

    await dbAdmin.query('START TRANSACTION;');

    const query = `SELECT * FROM USERS WHERE email = '${email}'`;
    const results = await dbAdmin.query(query);
    await dbAdmin.query('COMMIT;');

    // The user is the first element of the first array in results
    const user = results[0][0];

    if (user && (await checkPassword(password, user.password))) {
        // Generate JWT and set cookie
        generateTokenSetCookie(res, user.user_id);

        res.json({
            _id: user.user_id,
            email: user.email,
            name: user.name,
            isAdmin: user.is_admin === 'Y' // Convert 'Y'/'N' to boolean, if needed
        });

    } else {
        res.status(401).json({
            message: 'Invalid email or password',

        });
        throw new Error('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = catchAsync(async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    if (!name || !email || !password) {
        res.status(400).json({
            message: 'Name, email, and password are required',
        });
        return;
    }

    const userExists = await dbAdmin.query(`SELECT * FROM USERS WHERE email = '${email}'`);
    if (userExists[0].length > 0) {
        res.status(400).json({
            message: 'User already exists',
        });
        return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate UUID for new user_id
    const newId = uuidv4();


    try {
        await dbAdmin.query('START TRANSACTION;');
        const isSuccess = await dbAdmin.query(`INSERT INTO USERS (user_id, name, email, password, is_admin) VALUES ('${newId}', '${name}', '${email}', '${hashedPassword}', '${isAdmin === true ? 'Y' : 'N'}')`);        
        await dbAdmin.query('COMMIT;');
        res.status(201).json({
            _id: newId,
            name: name,
            email: email,
            isAdmin: isAdmin === 'Y',
            message: "Registration is successful"
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Invalid user data',
        });
    }
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = catchAsync(async (req, res) => {
    res.cookie('jwt', 'logout', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        expires: new Date(0),
    });
    res.status(200).json({
        message: 'Logged out successfully',
    })
})


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = catchAsync(async (req, res) => {
    const userId = req.user.user_id;
    await dbAdmin.query('START TRANSACTION;');

    const query = `SELECT * FROM USERS WHERE user_id = '${userId}'`;
    await dbAdmin.query('COMMIT;');

    try {
        const results = await dbAdmin.query(query);
        const user = results[0][0];
        if (user) {
            res.json({
                _id: user.user_id,
                name: user.name,
                email: user.email,
                isAdmin: user.is_admin === 'Y',
            });
        } else {
            res.status(404).json({
                message: 'User not found',
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error',
        });
    }
}

)

// TODO: DO WE NEED updateUserProfile 


export { loginUser, registerUser, logoutUser, getUserProfile }