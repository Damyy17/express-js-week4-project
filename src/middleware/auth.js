const jwt = require('jsonwebtoken');

module.exports = (requiredRole) => {
    return (req, res, next) => {
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        jwt.verify(token, 'secret_key', (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }

            if (decodedToken.role !== requiredRole) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            req.user = decodedToken;
            next();
        });
    }
}
