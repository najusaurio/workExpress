// module
module.exports = function (req, res, next) {
    if (!req.session.sessionUser || !res.locals.sessionUser){
        res.redirect('/login/');
    } else {
        next();
    }
};