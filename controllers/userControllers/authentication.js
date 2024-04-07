const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const cons = require("../../constants");



const register = async (req, res, next) => {
    const username = req?.body?.username;
    const email = req?.body?.email;
    const password = req?.body?.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(
        {
            username: username,
            email: email,
            password: hashedPassword
        }
    );
    try {
        const newUser = await user.save();
        res.status(cons.ok).json(newUser);
    }
    catch (err) {
        if (err.code === cons.mongoerror) {
            res.status(cons.conflict).json(cons.userexists);
        }
        else {
            res.status(cons.internalerror).json(err);
            next();
        }
    }
}

const createToken = async (id) => {
    const token = jwt.sign({ id },"7websassignment", { expiresIn: 1000 });
    return token;
};

const comparePassword = async (password, user) => {
    const auth = await bcrypt.compare(password, user?.password);
    return auth;
};

const login = async (req, res, next) => {
    const email = req?.body?.email;
    const password = req?.body?.password;
    expirydate = 1000 * 60 * 60 * 24;
    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const validPassword = await comparePassword(password, user);
            if (!validPassword) {
                res.status(cons.badrequest).json(cons.wrongpass);
            }
            else {
                const token = await createToken(user._id);
                res.cookie('jwt', token, { maxAge: expirydate });
                res.status(cons.ok).json({ token: token, message: cons.success });
            }
        }
        else {
            res.status(cons.badrequest).json(cons.nouser);
        }
    }
    catch (err) {
        res.status(cons.internalerror).json(err);
        next();
    }
}


const logout = async (req, res, next) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(cons.ok).json(cons.logout);
}

module.exports = {
    register,
    login,
    logout
}