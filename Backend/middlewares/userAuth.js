import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    try {
        const token_decode = jwt.verify(authorization, process.env.JWT_SECRET);
        
        if (token_decode.isAdmin) {
             // Admin can also access user routes if needed, or we strictly keep it user.
             // For now, let's allow both or just ensure we have an ID for users.
        }

        req.userId = token_decode.id;
        next();

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default userAuth;
