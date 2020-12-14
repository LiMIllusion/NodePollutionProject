
module.exports = class User {
    constructor(username, email, password, id = null){
        this.id = id
        this.username = username
        this.email = email
        this.password = password
    }
    static find(param, callback){
        return db.query('SELECT * FROM users WHERE '+Object.keys(param)[0]+' = ?', [param[Object.keys(param)[0]]],callback)
    }
    static findByID(id, callback){
        return db.query('SELECT * FROM users WHERE id = ?', [id],callback)
    }
    save(){
        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO users(username, email, password) values (?,?,?)', [this.username, this.email, this.password], (result)=>{resolve()})
    })}
}