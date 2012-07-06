var express = require('express');

var ejs = {
    open: '{{',
    close: '}}'
};




exports.set = function(app){
    app.set('view options' , ejs);

    app.configure(function(){
        app.use(express.bodyParser());
        app.use(express.cookieParser());
        app.use( express.static( __dirname + '/static' ) );
    });
    

};

exports.admin = 'zhengxin';