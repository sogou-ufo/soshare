var db = require('../utils/db').db;


var onsuccess = function(target , result , cb){
    if( target.length == result.length ){
        cb && cb();
    }
};

exports.get = function(tag , cb){
    db.open(function(err , pClient){
        db.collection('tag' , function(err , collection){

            collection.findOne({name:tag}, function(err , data){
                db.close();
                cb && cb(data);
            });
        });
    });
};


exports.save = function(data , cb){
    var success = [];
    db.open(function(err,pClient){
        db.collection('tag' , function(err , collection){
            data.tag.forEach(function(tag){
                collection.findAndModify({name:tag}, {} , {$push:{articles:data.id} , $inc:{count:1}} , {upsert:true} , function(){
                    success.push(1);
                    onsuccess(data.tag , success , function(){
                        db.close();
                        cb && cb();
                    });
                });
            });
        });
    });
};


exports.update = function(articleId , oldTag , newTag , cb){
    var success = [];
    var deleteArr = [] , createArr = [];
    oldTag.forEach(function(t){
        if( newTag.indexOf( t ) == -1 ) deleteArr.push(t);
    });
    
    newTag.forEach(function(t){
        if( oldTag.indexOf( t ) == -1 ) createArr.push(t);
    });
    
    
    var createTag = function(collection){
        if( !createArr.length ){
            db.close();
            cb && cb();
        }
        createArr.forEach(function(tag){
            collection.findAndModify( {name:tag} , {} , {$push:{articles:articleId} ,$inc:{count:1}} , {upsert:true}  , function(){
                success.push(1);
                onsuccess( createArr , success , function(){
                    db.close();
                    cb && cb();
                } );
            } );
        });
    };
    if( !deleteArr.length && !createArr.length ){
        cb && cb();
    }else{
        db.open(function(err , pClient){
            db.collection('tag' , function(err , collection){
                if( deleteArr.length ){
                    deleteArr.forEach(function(t){
                        collection.update({ name:t } , { $pull: {articles : articleId} ,$inc:{count:-1}} , {safe:true} ,function(){
                            success.push(1);
                            onsuccess(deleteArr , success , function(){
                                success = [];
                                createTag(collection);
                            });
                        });
                    });
                }else{
                    createTag(collection);
                }
            });
        });
    }
};


exports.find = function(begin , end , cb){
    db.open(function(err , pClient){
        db.collection('tag' , function(err , collection){
            collection.find({} , {
                limit: end-begin,
                sort:{count:-1}
            } ).toArray(function(err , tags){
                db.close();
                cb && cb(tags);
            });
        });
    });
};