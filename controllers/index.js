




exports.get = function( req,res ){
    require('../models/article').find(0,50 , function(articles){
        require( '../models/tag' ).find( 0,20 , function(tags){
            res.render('../views/index.ejs' , {
                articles: articles,
                tags:tags,
                common: require('./common').fetch()
            });
        
        } );
    });
};

