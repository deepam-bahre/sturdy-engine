var express = require('express');
var router = express.Router();

router.get('/dashboard', ensureAuthenticated, function(req, res){
    res.render('dashboard');
});

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/users/login');
    }
}


module.exports = router;