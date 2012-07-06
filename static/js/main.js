(function(){
    if( $.browser.msie && parseInt( $.browser.version ) < 9 ){
        location.href="/share/bishi";
    }
    
    $('#Logout').on('click' , function(){
        return false;
    });
    
})();