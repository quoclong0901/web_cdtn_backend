const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const authMiddleWare = (req, res, next) => {

    const authHeader = req.headers.token;

    if (!authHeader ) {
        return res.status(401).json({
            message: "No token provided",
            status: "ERR"
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN , function(err, user) {
        if (err) {
            return res.status(404).json({
                message: "Invalid or expired token",
                status: "ERR"
            })
        }
        if(user?.isAdmin) {
            next()
        }else {
            return res.status(404).json({
                message: "Not authorized as admin",
                status: "ERR"
            })
        }

    });
}

const authUserMiddleWare = (req, res, next) => {
    const authHeader = req.headers.token;

    if (!authHeader ) {
        return res.status(401).json({
            message: "No token provided",
            status: "ERR"
        });
    }

    const token = authHeader.split(' ')[1];
    const userId = req.params.id

    jwt.verify(token, process.env.ACCESS_TOKEN , function(err, user) {
        if (err) {
            return res.status(404).json({
                message: "The authentication",
                status: "ERR"
            })
        }

        if(user?.isAdmin || user?.id === userId) {
            next()
        }else {
            return res.status(404).json({
                message: "The authentication",
                status: "ERR"
            })
        }

    });
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (!authHeader) {
        return res.status(401).json({ message: "No token provided", status: "ERR" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token", status: "ERR" });
        }
        req.user = user;
        next();
    });
}; 
module.exports = {
    authMiddleWare,
    authUserMiddleWare,
    verifyToken
}