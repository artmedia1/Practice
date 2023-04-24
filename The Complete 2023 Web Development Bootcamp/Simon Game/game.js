var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

function nextSequence(gamePattern){
    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomChosenColour  = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(colour){
    var audio = new Audio('sounds/'+colour+".mp3");
    audio.play(); 
}

$(document).on('keypress', function(){
    nextSequence(gamePattern);
});

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
});
