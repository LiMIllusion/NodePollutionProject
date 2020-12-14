const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const passport = require('passport')
const User = require('../models/user')

module.exports = function(passport){
    passport.use(
        new LocalStrategy({
            usernameField : 'email',
        }, (email, password, done)=>{
            User.find(email, function(err, users){
                if(users.length == 0){
                    return done(null, false, {message : 'Account inesistente'})
                }
                user = users[0]
                bcrypt.compare(password, user.password, (err, isMatch)=>{
                    if(err) throw err
                    if(isMatch){
                        return done(null, user)
                    }
                    else{
                        return done(null, false, {message : 'La password non è corretta'})
                    }
                })
            })/*.catch((err) => console.log(err))*/
        })
    )
    passport.serializeUser(function(user, done){
        console.log(user.id)
        done(null, user.id)
    })
    passport.deserializeUser(function(id, done){
        User.findByID(id, function(err, users){
            user = users[0]
            done(err,user)
        })
    })
}