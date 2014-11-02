// plugin
module.exports = function(req, res, next){
    res.cookie('token', 'hello', {
        signed: true,
        expires: new Date(Date.now() + 10000)
    });
    res.cookie('tow', 'hello_world', {
        expires: new Date(Date.now() + 10000)
    });
    next();
};