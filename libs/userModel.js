//用户数据库模型

function user(){
	this._tableName='user_info';
}

user.prototype.create=function(){
	var sqlStr='CREATE TABLE `'+this._tableName+'` ('
	+'`id` int(11) unsigned NOT NULL AUTO_INCREMENT,'
	+'`user_id` varchar(20) CHARACTER SET utf8 NOT NULL,'
	+'`name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,'
	+'`pwd` varchar(20) CHARACTER SET utf8 NOT NULL,'
	+'`register_date` int(11) NOT NULL,'
	+'`last_login_date` int(11) NOT NULL,'
	+'`face` varchar(50) CHARACTER SET utf8 NOT NULL,'
	+'`describe` varchar(144) CHARACTER SET utf8 NOT NULL,'
	+'PRIMARY KEY (`id`)'
	+') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4';
	
	return sqlStr;
}

user.prototype.selectAll=function(){
	var sqlStr='select * from '+this._tableName;
	
	return sqlStr;
}

user.prototype.isExistUserId=function(id){
	var sqlStr="select * from "+this._tableName+" where user_id=?";
	
	return sqlStr;
}

user.prototype.isAvailableUser=function(userId,pwd){
	var sqlStr="select * from "+this._tableName+" where user_id=? and pwd=?";
	
	return sqlStr;
}

user.prototype.insert=function(params){
	var timestamp=new Date().getTime();
	timestamp=parseInt(timestamp/1000);
	
	var sqlStr="insert into "
		+this._tableName
		+" (`user_id`,`pwd`,`register_date`,`last_login_date`) value(?,?,'"
		+timestamp
		+"','"
		+timestamp
		+"');";
		
	return sqlStr;
}

module.exports=new user();