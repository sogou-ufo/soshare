




exports.get = function( req,res ){
    var step = 30;

    require('../models/article').find(0,step , function(articles){
        require( '../models/tag' ).find( 0,20 , function(tags){
            res.render('../views/index.ejs' , {
                articles: articles,
                tags:tags,
                step:step,
                common: require('./common').fetch()
            });
        
        } );
    });
};

