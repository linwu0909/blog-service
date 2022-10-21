module.exports = options => {
    return async function adminAuthCheck(ctx, next) {
        ctx.session.openId = '123'
        if (ctx.session.openId) {
            await next()
        } else {
            ctx.body = {data: '没有登陆'}
        }
    }
}
