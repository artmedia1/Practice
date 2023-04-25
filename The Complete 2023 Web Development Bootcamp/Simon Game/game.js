var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var currentLevel = 0;

function nextSequence(gamePattern){
    userClickedPattern = []
    level += 1;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * buttonColours.length);
    var randomChosenColour  = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animateButton(randomChosenColour);
    playSound(randomChosenColour);
}

function playSound(colour){
    var audio = new Audio('sounds/'+colour+".mp3");
    audio.play(); 
}

function checkAnswer(currentLevel){
    // alert(gamePattern[currentLevel] + "," + userClickedPattern[currentLevel]);
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        return true;
    }
    return false;
}

function animateButton(colour){
    $("#" + colour).fadeOut(100).fadeIn(100);
}

$(document).on('keypress', function(){
    nextSequence(gamePattern);
});

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    currentLevel = userClickedPattern.length - 1;
    if (checkAnswer(currentLevel)){
        animateButton(userChosenColour);
        playSound(userChosenColour);
        if (currentLevel === level-1){
            setTimeout(function(){
                nextSequence(gamePattern)
            }, 1000);
        }
    }
    else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").toggleClass("game-over");
        setTimeout(function(){
            $("body").toggleClass("game-over");
        }, 200);
        level = 0;
        gamePattern = [];
    }
});

