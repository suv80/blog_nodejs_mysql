//用户数据库模型

function user() {
	this._tableName = 'user_info';
}
//查询所有用户
user.prototype.selectAll = function () {
	var sqlStr = 'select * from ' + this._tableName;

	return sqlStr;
}
//查询用户名是否已经存在
user.prototype.isExistUserId = function (id) {
	var sqlStr = "select * from " + this._tableName + " where user_id=?";

	return sqlStr;
}
//用户名密码是否有效
user.prototype.isAvailableUser = function (userId, pwd) {
	var sqlStr = "select * from " + this._tableName + " where user_id=? and pwd=?";

	return sqlStr;
}
//注册
user.prototype.insert = function (params) {
	var timestamp = new Date().getTime();
	timestamp = parseInt(timestamp / 1000);

	var sqlStr = "insert into "
		+this._tableName
		 + " (`user_id`,`pwd`,`register_date`,`last_login_date`) value(?,?,'"
		+timestamp
		 + "','"
		+timestamp
		 + "');";

	return sqlStr;
}
user.prototype.updateLastLoginDate = function () {
	var timestamp=parseInt(new Date().getTime()/1000);
	var sqlStr = "update " + this._tableName + " set last_login_date='" + timestamp + "' where user_id=?;";

	return sqlStr;
}

module.exports = new user();
