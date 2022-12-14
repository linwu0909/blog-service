const { Controller } = require('egg')

class MainController extends Controller {
    async checkLogin() {
        let userName = this.ctx.request.body.userName;
        let password = this.ctx.request.body.password;
        const sql = "SELECT userName FROM admin_user WHERE userName = '"+ userName + "' AND password = '"+password + "'";
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = {'openId': openId}
            // this.ctx.cookies.set('openId', openId, {secure: true, sameSite: 'None'})
            this.ctx.body = {'data': '登陆成功', 'openId': openId}
        } else {
            this.ctx.body = {'data': '登陆失败'}
        }
    }

    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = {data: resType}
    }

    async addArticle() {
        let article = this.ctx.request.body
        const result = await this.app.mysql.insert('article', article)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }

    async updateArticle() {
        let article = this.ctx.request.body
        const result = await this.app.mysql.update('article', article)
        const updateSuccess = result.affectedRows === 1
        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }

    async getArticleList() {
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            'article.viewCount as viewCount,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
            'type.typeName as typeName '+
            'FROM article LEFT JOIN type ON article.typeId = type.Id '+
            'ORDER BY article.id DESC '
        const list = await this.app.mysql.query(sql)
        this.ctx.body = {list: list}
    }

    async deleteArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', {id: id})
        this.ctx.body = {data: res}
    }

    async getArticleById() {
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,'+
            'article.title as title,'+
            'article.introduce as introduce,'+
            'article.articleContent as articleContent,'+
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,"+
            'article.viewCount as viewCount ,'+
            'type.typeName as typeName ,'+
            'type.id as typeId '+
            'FROM article LEFT JOIN type ON article.typeId = type.Id '+
            'WHERE article.id='+id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = {data: result}
    }
}

module.exports = MainController
