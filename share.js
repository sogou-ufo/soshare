



var app = require('express').createServer();

require('./config').set(app);

app.get('*' , require('./controllers/common').get);


app.get('/', require('./controllers/index').get);
app.get('/post/new', require('./controllers/post.new').get);
app.post('/post/new', require('./controllers/post.new').post);

app.get(/post\/(\d+)$/, require('./controllers/post.article').get);

app.get(/post\/(\d+)\/edit/, require('./controllers/post.edit').get);
app.post(/post\/(\d+)\/edit/, require('./controllers/post.edit').post);

app.get(/post\/(\d+)\/delete/, require('./controllers/post.delete').get);


app.get('/tag/:tag', require('./controllers/tag.single').get);

app.get('/search', require('./controllers/search').get);

app.get('/api/add', require('./controllers/api.add').get);



app.get('/bishi', function(req,res){
    res.render('bishi.ejs' , {layout:false});
});


app.get('*', function(req, res){
    res.render('404.ejs' , {
        common: require('./controllers/common').fetch()
    });
});

app.listen(3000);






console.log('Server started.');