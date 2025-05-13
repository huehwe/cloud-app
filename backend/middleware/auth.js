import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Sequelize model

export const protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from token using Sequelize
        const user = await User.findByPk(decoded.id); // Sequelize method to find by primary key

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user; // Attach user to request object
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ message: 'Not authorized' });
    }
};

export const requireVerifiedEmail = async (req, res, next) => {
    if (!req.user.isEmailVerified) {
        return res.status(403).json({ message: 'Please verify your email first' });
    }
    next();
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `User role ${req.user ? req.user.role : 'unknown'} is not authorized to access this route`
            });
        }
        next();
    };
};