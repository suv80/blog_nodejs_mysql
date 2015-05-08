//安装初始化

function install(){
	this._userInfo='user_info';
}

install.prototype.createTables=function(){
    var sqlStr='';
    
    //创建用户表
    sqlStr+="CREATE TABLE IF NOT EXISTS `"+this._userInfo+"` ("
        +"`id` int(11) unsigned NOT NULL AUTO_INCREMENT,"
        +"`user_id` varchar(20) CHARACTER SET utf8 NOT NULL,"
        +"`name` varchar(20) CHARACTER SET utf8 DEFAULT NULL,"
        +"`pwd` varchar(20) CHARACTER SET utf8 NOT NULL,"
        +"`register_date` int(11) NOT NULL,"
        +"`last_login_date` int(11) NOT NULL,"
        +"`face` varchar(50) CHARACTER SET utf8 NOT NULL,"
        +"`describe` varchar(144) CHARACTER SET utf8 NOT NULL,"
        +"PRIMARY KEY (`id`)"
        +") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;";
    
    //创建后续表，一定要在完整的SQL语句后加;，否则会出错。
	
	return sqlStr;
}

module.exports=new install();