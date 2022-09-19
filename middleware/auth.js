const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const decode = jwt.verify(token, "superdupersecret");
        req.user = decode.user;
        next();
    } catch (error) {
        return res.sendStatus(401);
    }

};


module.exports = auth;