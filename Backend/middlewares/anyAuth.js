import jwt from 'jsonwebtoken';

const anyAuth = async (req, res, next) => {
    // Check for authorization in various casing to be extra safe
    const tokenHeader = req.headers.authorization || req.headers.Authorization;

    if (!tokenHeader) {
        return res.json({ success: false, message: "Not Authorized. Login Again" });
    }

    // Handle "Bearer " prefix if present
    const token = tokenHeader.startsWith('Bearer ') ? tokenHeader.split(' ')[1] : tokenHeader;

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = token_decode.id;
        req.isAdmin = token_decode.isAdmin;
        next();

    } catch (error) {
        console.error("Auth verification error:", error.message);
        res.json({ success: false, message: "Session expired. Please login again." });
    }
};

export default anyAuth;
