var mysql = require('mysql');

module.exports = class Database{
  constructor(){
    this.connection = mysql.createConnection({
      host     : '',
      user     : '',
      password : '',
      database : ''
    });
  }
  connect(){
    this.connection.connect()
  }
  disconnect(){
    this.connection.end()
  }
  query(q, param, callback){
    return this.connection.query(q, param, function (error, result, fields){
      if(error) throw error
      if (callback) callback(error, result)
  })
  }
}