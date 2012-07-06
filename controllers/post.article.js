var md = require("node-markdown").Markdown;
var config = require('../config');



exports.get = function(req , res){
    var id = req.params[0];

    require('../models/article').get(id , function(data){
        if( !data ){
            res.redirect('/share/404');
            return;
        }
        data.article = md( data.article );
        data.common = require('./common').fetch();
        if( data.author == data.common.uname || data.common.uname == config.admin ){
            data.admin = true;
        }
        res.render( '../views/article.ejs' , data );
    });
};

