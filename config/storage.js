var multer = require('multer')
var path = require('path')

module.exports = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname,'../public/images/uploads'))
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname+'-'+Date.now())
    }
})