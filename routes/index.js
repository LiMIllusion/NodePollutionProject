var express = require('express');
var router = express.Router();
var Post = require('../models/post')
var Database = require('../database');
db = new Database()
const {ensureAuthenticated} = require("../config/auth")
var multer = require('multer')
var storage = require("../config/storage")
var upload = multer({storage:storage})

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.findAll((err, results)=>{
    if(err) throw err
    res.render('index', {user: req.user, posts : results});
  })
  
});
router.get('/search', function(req, res, next) {
  
  Post.search(req.query.text,(err, results)=>{
    res.render('index', {user: req.user, posts : results, text : req.query.text});
  })
  
});

/*register page*/
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/upload', ensureAuthenticated, function(req, res, next){
  res.render('upload', {
    user : req.user
  })
})

router.post('/uploadFile',ensureAuthenticated, upload.single('post'), function(req, res, next){
  const file = req.file
  if(!file){
    const error = new Error('Carica una foto per continuare')
    error.httpStatusCode = 400
    return next(error)
  }
  const {city, address, description} = req.body
  let errors = []
  if(!city || !address || !description) {
    errors.push({msg: "Riempi tutti i campi"})
  }
  
  if(errors.length > 0){
    res.render('upload',{
        errors: errors,
        city: city,
        address: address,
        description: description,
    })
  }else{
    post = new Post(req.user.id, city, address, description, file.filename)
    post.save().then(()=>{
      res.redirect('/')
    }).catch((err)=> console.log(err))
  }
})

module.exports = router;
