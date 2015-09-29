#! /usr/bin/env node
var conf     = require('../conf.json'),
    prompt   = require('prompt'),
    mongoose = require('mongoose'),
    bcrypt   = require('bcrypt');

mongoose.connect('mongodb://' + conf.mongoDB.host + '/' + conf.mongoDB.name);

var modelUser = require('../app/website/models/schema/user');

function userExists(name, callback){
    modelUser.find({
        username: name
    }).exec(function (err, doc) {
        if (doc[0] === undefined) {
            callback(false);
        } else {
            callback(true);
        }
    });
}

function saveUser(user, callback){
    modelUser.create(user, function() {
        callback();
    });
}

var properties = [
    {
        name: 'username',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Username must be only letters, spaces, or dashes'
    },
    {
        name: 'password',
        hidden: true
    }
];

prompt.start();

prompt.get(properties, function (err, result) {
    var user = {
        'username': result.username,
        'password': result.password
    };

    if (err) {
        return onErr(err);
    }

    userExists(user.username,function(exists){
        if (exists){
            return onErr('Error: This username already exists');
        } else {
            bcrypt.genSalt(12, function (err, salt) {
                if (err) return next(err);
                user.salt = salt;
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) return next(err);
                    user.password = hash;
                    saveUser(user,function(){
                        console.log('user stored properly');
                        process.exit(0);
                    });
                })
            });
        }
    });
});

function onErr(err) {
    console.log(err);
    process.exit(0);
}