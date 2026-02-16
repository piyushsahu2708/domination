const userModel = require("../models/user.model");
const blackListModel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");
module.exports.isAuthenticated = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }

        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token missing"
            });
        }

        const isBlackListed = await blackListModel.findOne({ token });

        if (isBlackListed) {
            return res.status(401).json({
                message: "Token blacklisted"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};


module.exports.isSeller = async (req, res, next) => {
    try {
        const user = req.user;

        if (user.role !== "seller") {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        next();

    } catch (error) {
        next(error);
    }
}
