import jwt from 'jsonwebtoken'

const auth = (req,res,next)=>{
    const token = req.headers.authorization;

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode.isAdmin !== true) {
            return res.json({ success: false, message: "Not Authorized. Login Again" });
        }
        next();
    } catch (error) {
        res.json({ success: false, message: "Invalid or expired token" });
    }

}

export default auth;