module.exports = {
    // admin
    admin     : require('./controllers/admin/home'),
    adminUser : require('./controllers/admin/user'),
    // website
    home     : require('./controllers/home'),
    article  : require('./controllers/article'),
    category : require('./controllers/category')
};