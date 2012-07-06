var Db = require('mongodb').Db;
var Server = require('mongodb').Server;



var client = new Db('share' , new Server('10.14.135.204' , 27017 , {}));




exports.db = client;


