import jwt from 'jsonwebtoken'


export const genratejwt=(userId,res)=>{
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '180d', // Token valid for 180 days

    });
res.cookie("jwt", token,{
        maxAge: 180 * 24 * 60 * 60 * 1000, // 180 days in milliseconds
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        sameSite: 'strict', // Helps prevent CSRF attacks
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    })

return token;

}
