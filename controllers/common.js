
var username = null;
var config = require('../config');

exports.get = function(req,res,next){
    var cookie = req.cookies['jpassport-sp'];
    
    username = /{username:(\w+)@sogou.*/.exec(cookie)[1];
    
    next();
};




exports.fetch = function(){
    return {
        uname:username
    };
};

exports.checkPermission = function(res , name){
    if( name == username || username == config.admin ){
        return true;
    }else{
        res.redirect('/share/404');
    }
};