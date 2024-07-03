const jwt = require("jsonwebtoken");
const config = require("../lib/config");
require("dotenv").config();

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "access denied, no token provide" });
    }

    try {
        const decoded = jwt.verify(token, config.tokenKey);
        if (!decoded.is_admin) {
            return res.status(403).json({ message: "access denied, admin only" });
        }

        req.user = decoded;
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid token" });
    }
};

module.exports = {verifyAdmin};