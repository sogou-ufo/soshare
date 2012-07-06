var db = require('../utils/db').db;


exports.get = function(id , cb){
    db.open(function(err , pClient){
        db.collection('article' , function(err , collection){

            collection.findOne({id:+id}, function(err , data){
                db.close();
                cb && cb(data);
            });
        });
    });
};



exports.getAll = function(idArr , cb){
    db.open(function(err , pClient){
        db.collection('article' , function(err , collection){

            collection.find({id:{$in:idArr}}).toArray( function(err , data){
                db.close();
                cb && cb(data);
            });
        });
    });
};

exports.insert = function(data , cb){
    db.open(function(err,pClient){
        db.collection('article' , function(err , collection){
            var time = new Date();
            data.time = time.getFullYear() + '.' + (+time.getMonth()+1) + '.' + time.getDate() ;
            data._keywords = data.title.split(' ').map(function(item){
                return item.toLowerCase();
            });
            collection.insert(data , {safe:true} , function(err,result){
                if (err) console.warn(err.message);
                db.close();
                cb && cb();
            });
        });
    });
};

exports.update = function(data , cb){
    db.open(function(err , pClient){
        db.collection('article' , function(err , collection){
            collection.findOne({id:+data.id} , function(err , old){
                data._keywords = data.title.split(' ').map(function(item){
                    return item.toLowerCase();
                });
                collection.update({id:+data.id} , {$set: data} , {safe:true} , function(err , result){
                    if (err) console.warn(err.message);
                    db.close();
                    cb&& cb(old);
                });
            
            });
        });
    });
};


exports.find = function(begin , end , cb){
    db.open(function(err , pClient){
        db.collection('article' , function(err , collection){
            collection.find({} , {
                limit: end-begin,
                sort:{id:-1}
            } ).toArray(function(err , articles){
                db.close();
                cb && cb(articles);
            });
        });
    });
};

exports.search = function(query , begin , end , cb){
    db.open(function(err , pClient){
        db.collection('article' , function(err , collection){
            collection.find({_keywords:query} , {
                article:0
            } , {
                limit: end-begin,
                sort:{id:-1}
            } ).toArray(function(err , articles){
                db.close();
                cb && cb(articles);
            });
        });
    });
};

exports.remove = function(query , cb){
    db.open(function(err , pClient){
        db.collection('article' , function(err , collection){

            collection.remove(query, {safe:true} ,  function(err , data){
                db.close();
                cb && cb(data);
            });
        });
    });
};
