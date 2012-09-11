var exec = require('child_process').exec;


exports.get = function(req,res){
    var title = req.query.title;
    var url = req.query.url;
    var tag = req.query.tag && req.query.tag.trim().split(' ') || [];
    var key = req.query.key || '';
    var author = require('./common').fetch().uname;
    
    if( !title || !title.length || !url || !url.length ||!tag.length ){
        res.send(JSON.stringify({result:1, err_msg:"Required parameter missing"}));
        return;
    }


    exec('python ' + __dirname + '/../cli/read.py ' + url , function(err , stdout , stderr){
        var html = stdout;
        if(!html || !html.length){
            res.send(JSON.stringify({result:1 , err_msg:"Not find anything."}));
            return;
        }
        html = html.replace('<body>' , '').replace('<html>' , '').replace('</body>' , '').replace('</html>' , '');
        
        require('../models/main').getId(function(id){
            require('../models/article').insert({
                title:title,
                url:url,
                tag:tag,
                author:author,
                article:html,
                id:id,
                key:key
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
    });
};

