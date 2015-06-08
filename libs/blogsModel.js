//用户数据库模型

function blogs() {
	this._tableName = 'blog';
}
//查询所有博文
blogs.prototype.fetchAll=function(){
    return "select * from blog where user_id=? order by update_date DESC";
}
//增加一条博文
blogs.prototype.addBlog=function(){
    var timestamp = new Date().getTime();
    timestamp = parseInt(timestamp / 1000);

    $str="insert into blog(`title`,`content`,`create_date`,`update_date`,`user_id`,`ding`,`tag`) "
    $str+="values(?,?,'"+timestamp+"','"+timestamp+"',?,'0','')";

    return $str;
}


module.exports = new blogs();
