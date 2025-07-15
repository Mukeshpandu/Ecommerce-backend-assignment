const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ msg: "No token, access denied" });
    }

    // Extract token from 'Bearer <token>'
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // decoded = { id, role, iat, exp }
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = auth;
