require([],function(){
    var $tags = $('#JS_tag_cloud a');
    var tagsNumSum = 0;
    $tags.each(function(index){
        tagsNumSum += Number($(this).attr('data-num'));
    });
    $tags.each(function(index){
        var num = $(this).attr('data-num');
        var percent = 0;
        percent = Math.ceil(num*5/tagsNumSum);
        $(this).addClass('tag-color-'+percent);
    });

    if(piscesConfig.navAlways == true){
        $(window).scroll(function(){

            var scrollTop = $(window).scrollTop();
            if ( scrollTop >200 ){
                $(".JS_main_nav").removeClass('normal-mode').addClass('top-mode');
            } else{
                $(".JS_main_nav").removeClass('top-mode').addClass('normal-mode');
            }

        });
    }
    if(piscesConfig.duoshuoEnable == true){
        var ds = document.createElement('script');
        ds.type = 'text/javascript';ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0]
         || document.getElementsByTagName('body')[0]).appendChild(ds);
    }
    if(piscesConfig.baiduTongjiEnable == true){
        var _hmt = _hmt || [];
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?e374043b6387919f72d88cc71b87c543";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    }
});
