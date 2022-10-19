module.exports = app => {
    const {router, controller} = app;
    router.get('/front/', controller.front.home.index)
    router.get('/front/article/list', controller.front.home.getArticleList)
    router.get('/front/article/id/:id', controller.front.home.getArticleById)
    router.get('/front/typeInfo', controller.front.home.getTypeInfo)
    router.get('/front/list/id/:id', controller.front.home.getListById)
};
