


exports.get = function(req,res){
    res.render('../views/about.ejs' , {
        common: require('./common').fetch()
    });
    
    

};