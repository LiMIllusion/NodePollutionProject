var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport')
var User = require('../models/user')
var Database = require('../database');
const { render } = require('../app');
const {ensureAuthenticated} = require("../config/auth")
var Post = require('../models/post')

db = new Database()


router.get('/profile', ensureAuthenticated, function(req, res, next) {
  Post.findByUserID(req.user.id, (err, results)=>{
    if (err) throw err
    console.log(results)
    res.render('index', {user: req.user, posts : results});
  })
});

router.get('/login', function(req, res, next) {
  res.render('login',{
    user : undefined
  });
});

router.get('/register', function(req, res, next) {
  res.render('register', {
    user : undefined
  });
});

router.post('/register', function(req, res, next) {
  
  const {name, email, password, password2} = req.body
  let errors = []
  if(!name || !email || !password || !password2) {
    errors.push({msg: "Riempi tutti i campi"})
  }
  if(password !=password2){
    errors.push({msg: "Le password non combaciano"})
  }
  if(password.length < 8){
    errors.push({msg: "La password deve essere di almeno 8 caratteri"})
  }
  if(errors.length > 0){
    res.render('register',{
        errors: errors,
        name: name,
        email: email,
        password: password,
        password2: password2
    })
  }
  else{
      User.find({'email' : email}, function(err, result){
        if(result.length>0){
        errors.push({msg: 'Email già registrata'})
        res.render('register',{
          errors: errors,
          name: name,
          email: email,
          password: password,
          password2: password2
        })
      }
      else{
        User.find({'username' : name}, function(err, results){
          if(results.length>0){
            errors.push({msg:'Nome utente in uso'})
            res.render('register',{
              errors: errors,
              name: name,
              email: email,
              password: password,
              password2: password2
            })
          }
          else{
              const newUser = new User (name, email, password)
              bcrypt.genSalt(10, (err,salt)=>{
              bcrypt.hash(newUser.password, salt, 
                (err, hash)=>{
                  if (err) throw err
                  newUser.password = hash
                  newUser.save().then(()=>{
                    req.flash('success_msg','Sei registrato correttamente!')
                    res.redirect('/users/login')
                  }).catch((err)=> console.log(err))
                })
              })
          }
        })
      }
      })
    }

});

router.post('/login', function(req, res, next) {
  passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/users/login',
    failureFlash : true,
    })(req,res,next);
});

router.get('/logout', (req,res)=>{
  req.logout()
  req.flash('success_msg', 'Sei uscito dall\'account')
  res.redirect('/users/login')
})
module.exports = router;
