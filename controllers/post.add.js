



exports.get = function(req,res){

    res.render('../views/add.ejs',{
        common:require('./common').fetch(),
        layout:false,
        title:req.query.title,
        url:req.query.url
    });
};


exports.post = function(req,res){

};