var mysql = require('mysql')
var migration = require("mysql-migrations")
require('dotenv').config({path: __dirname + '/.env'})

var connection = mysql.createPool({
    connectionLimit : 10,
    host     : process.env['DATABASE_HOST'],
    user     : process.env['DATABASE_USER'],
    password : process.env['DATABASE_PASSWORD'],
    database : process.env['DATABASE_NAME']
  });
  

migration.init(connection, __dirname+'/migrations')