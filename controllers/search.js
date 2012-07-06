exports.get = function(req,res){
    var tagReg = /^\[(\w+)\]$/;
    var query = req.query.q.toLowerCase();
    
    if( tagReg.test(query) ){
        var tag = RegExp['$1'];
        res.redirect('/tag/'+tag);
    }
    
    require('../models/article').search(query , 0 , 20 , function(articles){
        var data = {};
        data.articles = articles;
        data.common = require('./common').fetch();
        data.type = 'search';
        data.query = query;
        res.render( '../views/search.ejs' , data );
    });
    
};