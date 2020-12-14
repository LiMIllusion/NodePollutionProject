module.exports = {
    ensureAuthenticated : function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', "Devi essere autenticato per visualizzare")
        res.redirect('/users/login')
    }
}