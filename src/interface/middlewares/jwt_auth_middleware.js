const { verifyToken } = require("../../infrastructure/utils/jwt");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "authorization token missing or malformed" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "invalid or expired token" });
        }
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "invalid or expired token" });
    }
};

module.exports = authMiddleware;
