const cons = require('../constants');
const ifError = async(err, req, res, next) => {
    if(err){
        if(err.code === cons.mongoerror) {
            res.status(cons.conflict).send(cons.userexists);
        }else{
            res.status(cons.internalServerError).send('Internal Server Error');
        }
    }
    else{
        next();
    }
};

module.exports = ifError;