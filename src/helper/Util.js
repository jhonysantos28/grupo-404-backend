const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'Do you need provide a token.' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Invalid authenticate token.' });

        req.userId = decoded.id;
        next();
    });
}