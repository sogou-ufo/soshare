ejs.open = '{{';
ejs.close = '}}';

var AutoLoad = function(){
    var step , begin;
    var tm;
    var lock = false;
    var tpl;
    var container;
    var die = false;
    
    function monitor(){
        if( die ) return;
        
        if( lock ) return;
        var wheight = window.innerHeight;
        var sheight = window.scrollY;
        var dheight = document.body.offsetHeight;
        if( wheight + sheight > dheight -200 ){
            lock = true;
            getMoreArticle();
        }
    };
    
    function getMoreArticle(){
        $.ajax('/share/api/article' , {
            data:{
                begin:begin,
                end: begin+step
            }
        }).done(function(data){
            data = JSON.parse(data);
            if( !tpl ){
                $.ajax('/share/tpl/list.ejs').done(function(t){
                    tpl = t;
                    parseList(data);
                });
            }else{
                parseList(data);
            }
        });
        
    };
    
    function parseList(data){
        lock = false;
        if( data.length >=step ){
            begin += step;
        }else{
            die = true;
        }

        var html = '';
        data.forEach(function(item){
            html += ejs.render(tpl , {
                item:item
            });
        });
        container.append(html);
    };

    return{
        init: function(s , c){
            container = c;
            begin = step = s;
            
            tm = setInterval(monitor , 500);
        }
    };
}();




(function(){
    if( $.browser.msie && parseInt( $.browser.version ) < 9 ){
        location.href="/share/bishi";
    }
    
    


    if( window['page_conf'] && page_conf.autoload ){
        AutoLoad.init(page_conf.step , page_conf.load_container);
    }


    
})();