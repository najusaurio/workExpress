var nodemailer = require('nodemailer'),
    conf       = require('../../conf');

var Nodemailer = function(){
    this.transporter = nodemailer.createTransport({
        service: conf.plugin.nodemailer.service,
        auth: {
            user: conf.plugin.nodemailer.user,
            pass: conf.plugin.nodemailer.pass
        }
    });
};

Nodemailer.prototype.sendMail = function(){
    var mailOptions = {
        from: 'Fred Foo ✔ <'+ conf.plugin.nodemailer.user +'>',
        to: 'diego.uribe.gamez@gmail.com',
        subject: 'Hello ✔',
        text: 'Hello world ✔',
        html: '<b>Hello world ✔</b>'
    };

    this.send(mailOptions);
};

Nodemailer.prototype.send = function(mailOptions){
    this.transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });
};

module.exports = new Nodemailer();