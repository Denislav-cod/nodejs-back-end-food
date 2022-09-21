const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

const auth = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const decode = jwt.verify(token, process.env.SECRET);
        req.user = decode.user;
        next(req.user);
    } catch (error) {
        return res.sendStatus(401);
    }

};


module.exports = auth;