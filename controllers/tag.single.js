




exports.get = function(req , res){
    var usertag = req.params.tag;

    require( '../models/tag' ).get( usertag , function(tag){
        if( tag ){
            require('../models/article').getAll(tag.articles , function(articles){
                res.render('../views/search.ejs' , {
                    tag:tag,
                    articles:articles && articles.reverse(),
                    common:require('./common').fetch(),
                    type:'tag',
                    title:'标签'+tag.name+'下所有文章'
                });
                
            });
        }else{
                res.render('../views/search.ejs' , {
                    tag:{name:usertag},
                    articles:[],
                    common:require('./common').fetch(),
                    type:'tag',
                    title:'标签'+usertag+'下所有文章'
                });
        }
        
    } );
    
};