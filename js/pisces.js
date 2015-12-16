require([],function(){
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


    if(piscesConfig.duoshuoEnable == true){
        var duoshuoQuery = piscesConfig.duoshuoShortname;
        (function(){
          var dsq = document.createElement('script');
          dsq.type = 'text/javascript';
          dsq.async = true;
          dsq.src = '//' + duoshuoQuery + '.disqus.com/<% if (page.comments){ %>embed.js<% } else { %>count.js<% } %>';
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        }());
    }
    if(piscesConfig.baiduTongjiEnable == true){
        var _hmt = _hmt || [];
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?e374043b6387919f72d88cc71b87c543";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    }
});
