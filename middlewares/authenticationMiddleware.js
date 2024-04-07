const jwt = require('jsonwebtoken');
const cons = require('../constants');
const checkAuthenticated = async (req, res, next) => {
    const token = req?.body?.jwt;
    if (!token) {
        return res.status(cons.unauthorized).send(cons.invalidLogin);
    }
    try {
        const user1 = jwt.verify(token, '7websassignment');
        req.user = user1;
        next();
    } catch (error) {
        res.status(cons.conflict).send(cons.expired);
    }
};

const checkNotAuthenticated = async (req, res, next) => {
    const token = req?.body?.jwt;
    if (token) {
        try {
            const user1 = jwt.verify(token, '7websassignment');
            req.user = user1;
            res.status(cons.conflict).send(cons.success);
        } catch (error) {
            next();
        }
    } else {
        next();
    }
};


module.exports = {
    checkAuthenticated,
    checkNotAuthenticated
}