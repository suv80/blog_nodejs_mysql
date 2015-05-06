var mysql = require('mysql');

function conn(){
	this.connection = mysql.createConnection({
		host : '127.0.0.1',
		user : 'root',
		password : 'root',
		database : 'test'
	});
	
	this.test(function(err,message){
		if(err){
			console.log('error:',message);
		}else{
			console.log('ok,ID is:',message);
		}
	});
}

conn.prototype.test = function(callback){
	var connection=this.connection;
	var a=5;
	
	connection.connect(function(err){
		if (err) {
			callback(true,err.stack);
			return false;
		}
		
		callback(null,connection.threadId);
	});
};

conn.prototype.query = function(sqlStr,arr,callback){
	var connection = this.connection;
	
	connection.query(sqlStr,arr,function(err, rows) {
		if(err){
			callback(true,err.stack);
			return false;
		}
		
		callback(null,rows);
	});
};

module.exports=new conn();