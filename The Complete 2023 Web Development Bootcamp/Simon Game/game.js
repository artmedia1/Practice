class Simon {
    constructor() {
        this.buttonColours = ["red", "blue", "green", "yellow"];
        this.gamePattern = [];
        this.userClickedPattern = [];
        this.level = 0;
        this.numClicks = 0;
    }

    updateClickPattern(userChosenColour){
        this.userClickedPattern.push(userChosenColour);
    }

    resetClickedPattern(){
        this.userClickedPattern = []
    }
    
    nextSequence() { //Plays the next sequence of the Simon game
        this.level += 1;
        this.resetClickedPattern();
        $("#level-title").text("Level " + this.level);
        var randomNumber = Math.floor(Math.random() * this.buttonColours.length);
        var randomChosenColour = this.buttonColours[randomNumber];
        this.gamePattern.push(randomChosenColour);
        this.animateButton(randomChosenColour);
        this.playSound(randomChosenColour);
    }

    playSound(sound) {
        var audio = new Audio('sounds/' + sound + ".mp3");
        audio.play();
    }

    checkAnswer() {
        this.numClicks = this.userClickedPattern.length - 1;
        if (this.gamePattern[this.numClicks] === this.userClickedPattern[this.numClicks]) {
            return true;
        }
        return false;
    }

    animateButton(colour) {
        $("#" + colour).fadeOut(100).fadeIn(100);
    }

    gameOver() {//plays the game over animation, resets level and gamePattern.
        $("body").toggleClass("game-over");
        setTimeout(function () {
            $("body").toggleClass("game-over");
        }, 200);
        this.level = 0;
        this.gamePattern = [];
    }
}

var simon = new Simon();

$(document).on('keypress', function () { //Checks if level is 0 to start game on click
    if (simon.gamePattern.length == 0) {
        simon.nextSequence();
    }
});

$(".btn").on("click", function () {
    var userChosenColour = $(this).attr("id");
    simon.updateClickPattern(userChosenColour); 
    if (simon.checkAnswer()) {
        simon.animateButton(userChosenColour);
        simon.playSound(userChosenColour);
        if (simon.numClicks === simon.level - 1) {
            setTimeout(function () {
                simon.nextSequence()
            }, 1000);
        }
    }
    else {
        $("#level-title").text("Game Over, Press Any Key to Restart");
        simon.playSound("wrong");
        simon.gameOver();
    }
});

