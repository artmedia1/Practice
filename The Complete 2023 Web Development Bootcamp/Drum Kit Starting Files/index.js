
const button = document.querySelectorAll(".drum");

button.forEach(function(button) { //function(button) is an anonmynous function that adds eventlisteners but it is also the input for the forEach() function
    button.addEventListener('click', function(){
      play(button.innerHTML);
      buttonAnimation(button.innerHTML);
    });
  });

document.addEventListener('keydown', function(event){
  play(event.key.toLocaleLowerCase());
  buttonAnimation(event.key.toLocaleLowerCase());
});

// document.addEventListener("keypress", function(event){ 
//   console.log(event);
// });



function play(key){
    switch(key){
      case "w":
        var audio = new Audio('sounds/tom-1.mp3');
        break;
      case "a": 
        var audio = new Audio('sounds/tom-2.mp3');
        break;
      case "s":
        var audio = new Audio('sounds/tom-3.mp3');
        break;
      case "d":
        var audio = new Audio('sounds/tom-4.mp3');
        break;
      case "j":
        var audio = new Audio('sounds/crash.mp3');
        break;
      case "k": 
        var audio = new Audio('sounds/kick-bass.mp3');
        break;
      case "l": 
        var audio = new Audio('sounds/snare.mp3');
        break;
      default:  
        break;
    }
    try {
      audio.play();
    } catch (error) {
      console.log("The " + key + " button/key is causing issues.");
    }
    
}

function buttonAnimation(currentKey){
  var activeButton = document.querySelector("." + currentKey);
  activeButton.classList.toggle("pressed");
  setTimeout(function(){
    activeButton.classList.toggle("pressed");
  }, 100);
}