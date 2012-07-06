var db = require('../utils/db').db;


exports.getId = function(cb){
    db.open(function(err,pClient){
        db.collection('main' , function(err , collection){
            collection.findOne({"_id":"index"} , function(err,result){
                var id = result.id;
                collection.update({"_id":"index"} , {$inc:{"id":1}} , function(){
                    db.close();
                    cb && cb(id);
                });
            });
        });
    });
};

