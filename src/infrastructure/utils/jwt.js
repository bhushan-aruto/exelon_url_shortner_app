const jwt = require("jsonwebtoken")

const generateToken = (payload) => {
    const jwtSecreteKey = process.env.JWT_SECRETE_KEY

    if (!jwtSecreteKey) {
        console.error("missing or empty JWT_SECRETE_KEY env variable")
        return ""
    }

    return jwt.sign(payload, jwtSecreteKey, { expiresIn: '3d' })
}

const verifyToken = (token) => {
    const jwtSecreteKey = process.env.JWT_SECRETE_KEY

    if (!jwtSecreteKey) {
        console.error("missing or empty JWT_SECRETE_KEY env variable")
        return null;
    }

    try {
        const payload = jwt.verify(token, jwtSecreteKey);
        return payload;
    } catch (error) {
        return null;
    }
}

module.exports = { generateToken, verifyToken }