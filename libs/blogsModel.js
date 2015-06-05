//用户数据库模型

function blogs() {
	this._tableName = 'blog';
}
//查询所有博文
blogs.prototype.fetchAll=function(){
    return "select * from blog";
}


module.exports = new blogs();
