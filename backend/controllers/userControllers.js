import catchAsync from '../utils/catchAsync.js'
import db from '../config/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const checkPassword = async (enteredPassword, userPassword) => {
    return await bcrypt.compare(enteredPassword, userPassword)
}

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send('Email and password are required');
        return;
    }
    console.log(email, password)
    const query = `SELECT * FROM USERS WHERE email = '${email}'`;
    const results = await db.query(query);

    console.log(results);

    // The user is the first element of the first array in results
    const user = results[0][0];

    if (user && (await checkPassword(password, user.password))) {
        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        // set JWT as HTTP-Only cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        });

        res.json({
            _id: user.user_id,
            email: user.email,
            isAdmin: user.is_admin === 'Y' // Convert 'Y'/'N' to boolean, if needed
        });
    } else {
        res.status(401).send('Invalid email or password');
    }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = catchAsync(async (req, res) => {
    res.send('register user')
})

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
const logoutUser = catchAsync(async (req, res) => {
    res.send('logout user')
})


// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = catchAsync(async (req, res) => {
    res.send('get user profile')
}
)   

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = catchAsync(async (req, res) => {
    res.send('get user by id')
})

export { authUser, registerUser, logoutUser, getUserProfile, getUserById }