
var common = require('./common');


exports.get = function(req,res){
    var id = +req.params[0],
    author = common.fetch().uname;

    require('../models/article').get(id , function(data){
        if(common.checkPermission(res , data.author)){
            var tag = data.tag;
            require('../models/article').remove({id:id} , function(data){
                
                require('../models/tag').update( id , tag , [] , function(){
                    res.send(JSON.stringify({
                        result:0
                    }));
                } );
            });
        }
        
    });
};
        
