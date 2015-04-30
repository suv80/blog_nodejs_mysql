//用户数据库模型

function user(){
	
}

user.prototype.create(){
	var sqlStr='CREATE TABLE `nodejs` ('
	.'`id` int(11) unsigned NOT NULL AUTO_INCREMENT,'
	.'`user` varchar(20) NOT NULL,'
	.'`name` varchar(20) DEFAULT NULL,'
	.'`age` int(3) DEFAULT NULL,'
	.'`pwd` varchar(20) NOT NULL,'
	.'`create_date` int(11) NOT NULL,'
	.'PRIMARY KEY (`id`)'
	.') ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8';
	
	return sqlStr;
}

user.prototype.selectAll(){
	var sqlStr='select * from nodejs';
	
	return sqlStr;
}

user.prototype.selectOrderAgeByDESC(){
	var sqlStr='select * from nodejs order by age DESC';
	
	return sqlStr;
}

module.exports=new user();