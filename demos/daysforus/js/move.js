

var bgArray = document.querySelectorAll('.bg');
console.log(bgArray)

for (var i = 0; i < bgArray.length; i++) {
    var url = bgArray[i].getAttribute("data-url");
    console.log(url)
    bgArray[i].style.backgroundImage = "url("+ url +")";
    console.log(bgArray[i].style.backgroundImage)
};

//ScrollTop
$(".up").click(function() {
    $(".stage").animate({
        scrollTop:'0px'
    }, {
        duration: 500,
        easing: "swing"
    });
    return false;
});