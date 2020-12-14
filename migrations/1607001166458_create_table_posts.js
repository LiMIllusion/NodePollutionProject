module.exports = {
    "up": "CREATE TABLE posts( id int(11) NOT NULL AUTO_INCREMENT,user_id int(11) NOT NULL ,  city varchar(50) NOT NULL, address varchar(100) NOT NULL, description text, filename varchar (18) NOT NULL,PRIMARY KEY(id), FOREIGN KEY (user_id) REFERENCES users(id))",
    "down": "DROP TABLE posts"
}