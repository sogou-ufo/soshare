



exports.get = function(req,res){
    res.render('../views/new.ejs',{
        ptype:'new',
        common:require('./common').fetch()
    });
};


exports.post = function(req,res){
    var title = req.body.title,
    tag = req.body.tag.trim().split(' ').map(function(item){
        return item.toLowerCase();
    }),
    article = req.body.article,
    author = require('./common').fetch().uname;
    
    if( !title.length || !tag.length || !article.length ){
        res.send(JSON.stringify({result:1}));
    }else{
        
        require('../models/main').getId(function(id){
            
            require('../models/article').insert({
                title:title , 
                tag: tag,
                article: article,
                id:id,
                author:author
            } ,function(){
                
                require('../models/tag').save({
                    tag:tag,
                    id:id
                } , function(){

                    res.send(JSON.stringify({
                        result:0,
                        id: id
                    }));
                });
            
            });
        });
    }
};