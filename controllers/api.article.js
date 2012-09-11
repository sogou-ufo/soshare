


exports.get = function( req,res ){
    var begin = req.query.begin || 0;
    var end = req.query.end || 10;

    require('../models/article').find(begin,end , function(articles){
        var data = articles.map(function(item){
            return{
                author: item.author,
                title: item.title,
                id: item.id,
                tag:item.tag
            };
        });
        
        res.send(JSON.stringify(data));
    });
};



