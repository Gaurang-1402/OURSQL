import jwt from 'jsonwebtoken'

const generateTokenSetCookie = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });

    // set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

}

export default generateTokenSetCookie;