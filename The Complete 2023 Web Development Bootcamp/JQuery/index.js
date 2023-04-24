// $("h1").on("mouseover", function(){
//     $("h1").css("color", "green");
// });

$("button").on("click", function() {
    $("h1").slideUp().slideDown().animate({margin: 20, opacity: 0.5});
});