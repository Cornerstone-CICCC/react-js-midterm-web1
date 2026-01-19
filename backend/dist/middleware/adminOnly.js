"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = void 0;
const adminOnly = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: "Not authotized" });
    }
    if (req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
};
exports.adminOnly = adminOnly;
