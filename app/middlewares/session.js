// dependencies
var UserModel = require('../website/models/user'),
    ObjectId = require('mongoose').Types.ObjectId,
    model = new UserModel();

// module
module.exports = function (req, res, next) {
    var uid = req.session.uid;
    if (!uid) return next();
    if (!req.user || !res.locals.user){
        model.getById({_id:uid},function(user){ // falta colocarle a esta funcion err
            if (!user) return next();
            req.session.sessionUser = res.locals.sessionUser = user.toObject();
            next();
        });
    }
};