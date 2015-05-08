//session数据模型

function session() {
	this._tableName = 'session_uid';
}

//查询当前用户的session
session.prototype.getSidByUid = function () {
	var sqlStr = "select * from " + this._tableName + " where user_id=?";

	return sqlStr;
}
//查询当前session的用户
session.prototype.getUidBySid = function () {
	var sqlStr = "select * from " + this._tableName + " where session_id=?";

	return sqlStr;
}
//查询当前cookie中存储的信息是否合法
session.prototype.getUidAndSid = function () {
	var sqlStr = "select * from " + this._tableName + " where session_id=? and uid_md5=?";

	return sqlStr;
}
//增加记录
session.prototype.insert = function () {
	var sqlStr = "insert into " + this._tableName + "(`session_id`,`user_id`,`uid_md5`) values(?,?,?);";

	return sqlStr;
}
//删除当前用户的过去session信息
session.prototype.removeAllByUid = function () {
	var sqlStr = "delete from " + this._tableName + " where user_id=?;";

	return sqlStr;
}
module.exports = new session();
