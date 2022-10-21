module.exports = app => {
    const {router, controller} = app;
    let adminAuthCheck = app.middleware.adminAuthCheck()
    router.post('/admin/login/check', controller.admin.main.checkLogin)
    router.get('/admin/type/info', adminAuthCheck, controller.admin.main.getTypeInfo)
    router.post('/admin/article/add', adminAuthCheck, controller.admin.main.addArticle)
    router.post('/admin/article/update', adminAuthCheck, controller.admin.main.updateArticle)
    router.get('/admin/article/list', adminAuthCheck, controller.admin.main.getArticleList)
    router.get('/admin/article/delete/:id', adminAuthCheck, controller.admin.main.deleteArticle)
    router.get('/admin/article/detail/:id', adminAuthCheck, controller.admin.main.getArticleById)
};
