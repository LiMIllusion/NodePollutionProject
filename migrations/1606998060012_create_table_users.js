module.exports = {
    "up": "CREATE TABLE users( id int(11) NOT NULL AUTO_INCREMENT,username varchar(50) NOT NULL,email varchar(100) NOT NULL,password varchar(255) NOT NULL, PRIMARY KEY(id))",
    "down": "DROP TABLE users"
}