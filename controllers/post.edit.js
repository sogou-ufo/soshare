var common = require('./common');




exports.get = function(req,res){
    var id = req.params[0];

    
    require('../models/article').get(id , function(data){
        if(!common.checkPermission(res , data.author)){
            return;
        }
        data.ptype='edit';
        data.common = require('./common').fetch();
        res.render( '../views/new.ejs' , data );
    });
};


exports.post = function(req,res){
    

    var title = req.body.title,
    tag = req.body.tag.trim().split(' ').map(function(item){
        return item.toLowerCase();
    }),
    article = req.body.article,
    id = +req.body.id,
    author = require('./common').fetch().uname;
    
    if( !title.length || !tag.length || !article.length ){
        res.send(JSON.stringify({result:1}));
    }else{

        require('../models/article').get(id , function(data){
            if(!common.checkPermission(res , data.author)){
                return;
            }
            require('../models/article').update({
                title:title,
                tag:tag,
                article:article,
                id:id,
                author:data.author
            } , function(old){
                var oldTag = old.tag;
                require('../models/tag').update( id , oldTag , tag , function(){
                    res.send(JSON.stringify({
                        result:0,
                        id: id
                    }));
                    
                } );

                
            });
        });
/*            
            require('../models/tag').save({
                tag:tag,

                id:id
            } , function(){

                res.send(JSON.stringify({
                    result:0,
                    id: id
                }));
            });
            
        });*/
    }
};