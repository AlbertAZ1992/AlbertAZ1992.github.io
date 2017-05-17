$(function(){
    var gloabalId = 0;
    $('#fullpage').fullpage({
        normalScrollElements: '#avoidfull,.des-scroll',
        anchors: ['page1', 'page2', 'page3']
    });
    var screenWidth = $(window).width();
    var screenHeight = $(window).height();
    // console.log(screenHeight);
    $('#about').css('height',screenHeight);
    $('#works').css('height',screenHeight);
    $('#index').css('height',screenHeight);
    $('#mob-about').css('height',screenHeight);
    $('#mob-index').css('height',screenHeight);
    $('.mob-slides').css('height','suto');
    if(screenWidth <= 640){
        $('html').css('overflow', 'auto');
        $('body').css('overflow', 'auto');
        $('html').css('height', 'auto');
        $('body').css('height', 'auto');
        $('#fullpage').css('display', 'none');

    }else{
        $('html').css('overflow', 'auto');
        $('body').css('overflow', 'hidden');
        $('html').css('height', '100%');
        $('body').css('height', '100%');
        $('#fullpage').css('display', 'block');
    }
    var oldWidth = screenWidth;

    $(window).bind("resize", function(){
        var screenWidth = $(window).width();
        var screenHeight = $(window).height();
        // console.log(screenHeight);
        $('#about').css('height',screenHeight);
        $('#works').css('height',screenHeight);
        $('#index').css('height',screenHeight);
        $('#mob-about').css('height',screenHeight);
        $('#mob-index').css('height',screenHeight);
        $('.mob-slides').css('height','auto');
        if((oldWidth>=640 && screenWidth <= 640)||(oldWidth<=640 && screenWidth >= 640)){

            $('html').css('overflow', 'auto');
            $('body').css('overflow', 'auto');
            $('html').css('height', 'auto');
            $('body').css('height', 'auto');
            window.location.reload();
        }else{
            if(screenWidth <= 640){
                $('html').css('overflow', 'auto');
                $('body').css('overflow', 'auto');
                $('html').css('height', 'auto');
                $('body').css('height', 'auto');

            }else{

                $('html').css('overflow', 'auto');
                $('body').css('overflow', 'hidden');
                $('html').css('height', '100%');
                $('body').css('height', '100%');
                // if(gloabalId){
                //     $('#mob-item-des-close').trigger('click');
                //     $('#slides-item-'+gloabalId).trigger('click');
                // }
            }
        }
        oldWidth = screenWidth;
    });



    $('.slides-item').css('height',screenHeight);
    $('#works-arrow').click(function(){
        $.fn.fullpage.moveTo('page2');
    });
    $('#about-arrow').click(function(){
        $.fn.fullpage.moveTo('page3');
    });
    $('#index-arrow').click(function(){
        $.fn.fullpage.moveTo('page1');
    });
    $('#listIcon').click(function(){
        if($('#listIcon').hasClass('close')){
            $('#fullpage .nav').removeClass('show');
            $('#fullpage .nav-box').removeClass('show');
            $('#fullpage .nav-opt').removeClass('show');
            $('#listIcon').removeClass('close').addClass('active');
            $('#works').css('display','block');
            $('#about').css('display','block');

        }else{
            $('#fullpage .nav').addClass('show');
            $('#fullpage .nav-box').addClass('show');
            $('#fullpage .nav-opt').addClass('show');
            $('#listIcon').addClass('close');
            $('#works').css('display','none');
            $('#about').css('display','none');

        }
    });
    $('#nav-opt-work').click(function(){
        $('#listIcon').trigger('click');
        $.fn.fullpage.moveTo('page2');
    });
    $('.frame .title-work').click(function(){
        // $('#listIcon').trigger('click');
        $.fn.fullpage.moveTo('page2');
    });
    $('#nav-opt-about').click(function(){
        $('#listIcon').trigger('click');
        $.fn.fullpage.moveTo('page3');
    });
    $('.frame .title-about').click(function(){
        // $('#listIcon').trigger('click');
        $.fn.fullpage.moveTo('page3');
    });
    $('#logoIcon,.frameLogoIcon').click(function(){
        $.fn.fullpage.moveTo('page1');
    })
    $('#logoIcon,.frameLogoIcon').bind('touchstart',function(){
        $.fn.fullpage.moveTo('page1');
    })
    $('#mob-listIcon').click(function(){
        if($('#mob-listIcon').hasClass('close')){
            $('#mob-full .nav').removeClass('show');
            $('#mob-full .nav-box').removeClass('show');
            $('#mob-full .nav-opt').removeClass('show');
            $('#mob-listIcon').removeClass('close');
            $('.mobile-works').css('display','block');
            $('#mob-about').css('display','block');
        }else{
            $('#mob-full .nav').addClass('show');
            $('#mob-full .nav-box').addClass('show');
            $('#mob-full .nav-opt').addClass('show');
            $('#mob-listIcon').addClass('close');
            $('.mobile-works').css('display','none');
            $('#mob-about').css('display','none');
        }
    });
    $('#mob-listIcon').bind('touchstart',function(){
        if($('#mob-listIcon').hasClass('close')){
            $('#mob-full .nav').removeClass('show');
            $('#mob-full .nav-box').removeClass('show');
            $('#mob-full .nav-opt').removeClass('show');
            $('#mob-listIcon').removeClass('close');
            $('.mobile-works').css('display','block');
            $('#mob-about').css('display','block');
        }else{
            $('#mob-full .nav').addClass('show');
            $('#mob-full .nav-box').addClass('show');
            $('#mob-full .nav-opt').addClass('show');
            $('#mob-listIcon').addClass('close');
            $('.mobile-works').css('display','none');
            $('#mob-about').css('display','none');
        }
    });
    $('#mob-nav-opt-work,.frame .title-work').click(function(){
        $('#mob-listIcon').trigger('click');
        $.fn.fullpage.moveTo('page2');
        $('html,body').animate({scrollTop: $('#mob-slides-item-1').offset().top},500);
    });
    $('#mob-nav-opt-work,.frame .title-work').bind('touchstart',function(){
        $('#mob-listIcon').trigger('click');
        $.fn.fullpage.moveTo('page2');
        $('html,body').animate({scrollTop: $('#mob-slides-item-1').offset().top},500);
    });
    $('#mob-nav-opt-about,.frame .title-about').click(function(){
        $('#mob-listIcon').trigger('click');
        $('html,body').animate({scrollTop: $('#mob-about').offset().top},500);
    });
    $('#mob-nav-opt-about,.frame .title-about').bind('touchstart',function(){
        $('#mob-listIcon').trigger('click');
        $('html,body').animate({scrollTop: $('#mob-about').offset().top},500);
    });



    $('.menu-list-item').click(function(){
        var order = $(this).attr('data-order');
        console.log(order);
        $('.des-scroll').animate({scrollTop: 0},0);
        $('#item-des-close').trigger('click');
        $.fn.fullpage.moveTo('page2');
        $('.scroll-wrap').animate({scrollTop: order*screenHeight},500);
    });
    $('.scroll-wrap').scroll(function(event){
            var scrollTop = event.target.scrollTop;
            var deltaIndex = parseInt(scrollTop/screenHeight);
            var deltaTop = scrollTop%screenHeight;
            var workActiveIndex = 0;
            if(deltaTop > (screenHeight/3)){
                workActiveIndex = deltaIndex+1;
            }else{
                workActiveIndex = deltaIndex;
            }
            var workActiveIndexText = workActiveIndex + 1;
            var detailOrder = workActiveIndexText + '/6';
            $('#works .detail .order').text(detailOrder);
            switch(workActiveIndexText){
                case 1:
                    $('#works .detail .text').text('MyMeds');
                    $('#works .detail .name').text('Platform Application');
                    break;
                case 2:
                    $('#works .detail .text').text('Diabetics Sunlit-living').css('font-size','2rem');
                    $('#works .detail .name').text('Branding / Web');
                    break;
                case 3:
                    $('#works .detail .text').text('CLICKtips');
                    $('#works .detail .name').text('UI UX');
                    break;
                case 4:
                    $('#works .detail .text').text('Sushi Recipe').css('font-size','2rem');
                    $('#works .detail .name').text('Video');
                    break;
                case 5:
                    $('#works .detail .text').text('TDI Web').css('font-size','2rem');
                    $('#works .detail .name').text('UI Design Web');
                    break;
                case 6:
                    $('#works .detail .text').text('Big Fork').css('font-size','2rem');
                    $('#works .detail .name').text('UI Design');
                    break;
                default:
                    break;
            }
            $('#works .menu-list-item-'+ workActiveIndexText).addClass('active').siblings().removeClass('active');
            // $('#about .menu-list-item-'+ workActiveIndexText).addClass('active').siblings().removeClass('active');
            // renderWorks();
    });
    $(window).scroll(function(event){
        var scrollTop = event.target.body.scrollTop;
            // console.log(scrollTop);
        var deltaIndex = parseInt(scrollTop/screenHeight);
        var deltaTop = scrollTop%screenHeight;
        var workActiveIndex = 0;
        if(deltaTop > (screenHeight/3)){
            workActiveIndex = deltaIndex+1;
        }else{
            workActiveIndex = deltaIndex;
        }
        if(workActiveIndex == 1){
            //works
            $.fn.fullpage.moveTo('page2');
            // renderWorks();
        }else if(workActiveIndex == 2){
            //about
            $.fn.fullpage.moveTo('page3');
            // renderAbout();
        }else{
            //index
            // reposWork();
        }
    });
    $('.slides-item .content').click(function(){
        $('.item-descrip').addClass('active');
        var id = $(this).attr('data-id');
        console.log(gloabalId)
        $('.item-descrip #item-'+id).addClass('show').siblings().removeClass('show');
        $('.item-descrip').scrollTop(0);
    });
    $('#item-des-close').click(function(){
        $('.item-descrip').removeClass('active');
        gloabalId = 0;
    });

    $('.mob-slides').click(function(){
        $('.mob-item-descrip').addClass('active');
        $('.mob-slides').css('display','none');
        $('#mob-about').css('display','none');
        var id = $(this).attr('data-id');
        $('.mob-item-descrip #mob-item-'+id).addClass('show').siblings().removeClass('show');
        $('.mob-item-descrip').scrollTop(0);
    });
    $('.mob-slides').bind('touchstart',function(){
        $('.mob-item-descrip').addClass('active');
        $('.mob-slides').css('display','none');
        $('#mob-about').css('display','none');
        var id = $(this).attr('data-id');
        $('.mob-item-descrip #mob-item-'+id).addClass('show').siblings().removeClass('show');
        $('.mob-item-descrip').scrollTop(0);
    });
    $('#mob-item-des-close').click(function(){
        $('.mob-slides').css('display','block');
        $('#mob-about').css('display','block');
        $('.mob-item-descrip').removeClass('active');
    });
    $('#mob-item-des-close').bind('touchstart',function(){
        $('.mob-slides').css('display','block');
        $('#mob-about').css('display','block');
        $('.mob-item-descrip').removeClass('active');
    });
    // $('.mob-slides.mobile-works').click(function(){
    //     $('.item-descrip').addClass('active');
    //     var id = $(this).attr('data-id');
    //     $('.mob-item-descrip #item-'+id).addClass('show').siblings().removeClass('show');
    //     $('.mob-item-descrip').scrollTop(0);
    // });
    touchScroll("html");
    touchScroll("body");
});


function isTouchDevice(){
    try{
        document.createEvent("TouchEvent");
        return true;
    }catch(e){
        return false;
    }
}

function touchScroll(id) {
    if (isTouchDevice()) {
        var el = document.querySelector(id);
        var scrollStartPos = 0;
        document.querySelector(id).addEventListener("touchstart",function(event) {
                scrollStartPos = this.scrollTop + event.touches[0].pageY;
                event.preventDefault();
            },false);
        document.querySelector(id).addEventListener("touchmove",function(event) {
                this.scrollTop = scrollStartPos - event.touches[0].pageY;
                event.preventDefault();
            },false);
    }
}

function renderWorks(){
    if(!$('#works .frame .title-work').hasClass('active')){
        $('#works .frame .title-work').addClass('active');
    }
    if(!$('#about .frame .title-work').hasClass('active')){
        $('#about .frame .title-work').addClass('active');
    }
    if($('#works .frame .title-about').hasClass('active')){
        $('#works .frame .title-about').removeClass('active');
    }
    if($('#about .frame .title-about').hasClass('active')){
        $('#about .frame .title-about').removeClass('active');
    }
}
function renderAbout(){
    if(!$('#works .frame .title-about').hasClass('active')){
        $('#works .frame .title-about').addClass('active');
    }
    if(!$('#about .frame .title-about').hasClass('active')){
        $('#about .frame .title-about').addClass('active');
    }
    if($('#works .frame .title-work').hasClass('active')){
        $('#works .frame .title-work').removeClass('active');
    }
    if($('#about .frame .title-work').hasClass('active')){
        $('#about .frame .title-work').removeClass('active');
    }
    reposWork();
}
function reposWork(){
    // $('.scroll-wrap').animate({scrollTop: 0},100);
    // $('#works .menu-list-item-1').addClass('active').siblings().removeClass('active');
    $('#about .menu-list-item').removeClass('active');
}
