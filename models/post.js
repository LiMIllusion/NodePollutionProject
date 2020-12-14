
module.exports = class Post {
    constructor(user_id, city, address, description, filename, id = null){
        this.id = id
        this.user_id = user_id
        this.city = city
        this.address = address
        this.description = description
        this.filename = filename
    }
    static findAll(callback){
        return db.query('SELECT * FROM posts ORDER BY filename DESC',callback)
    }

    static findByUserID(id, callback){
        return db.query('SELECT * FROM posts WHERE user_id = ? ORDER BY filename DESC', [id],callback)
    }

    static search(text, callback){
        return db.query('SELECT * FROM posts WHERE city LIKE ? OR address LIKE ? ',['%'+text+'%','%'+text+'%'],callback)
    }
    save(){
        return new Promise((resolve, reject)=>{
            db.query('INSERT INTO posts(user_id, city, address, description, filename) values (?,?,?,?,?)', [this.user_id,this.city,this.address,this.description ,this.filename], (result)=>{resolve()})
    })}
}