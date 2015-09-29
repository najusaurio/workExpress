module.exports = {
    // admin
    adminLogin : require('./controllers/admin/login'),
    admin : require('./controllers/admin/home'),
    adminUser : require('./controllers/admin/user'),
    adminArticle : require('./controllers/admin/article'),
    // website
    home : require('./controllers/home'),
    article : require('./controllers/article')
};