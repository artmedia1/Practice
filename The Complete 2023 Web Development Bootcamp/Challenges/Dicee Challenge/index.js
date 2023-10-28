
// window.onload = function() {
//     roll();
//   };

const button = document.querySelector(".roll");
button.addEventListener("click", roll);

function roll(){
    var player1 = Math.floor(Math.random() * 6) + 1;
    var player2 = Math.floor(Math.random() * 6) + 1;
    document.querySelector(".img1").setAttribute("src",setImg(player1))
    document.querySelector(".img2").setAttribute("src",setImg(player2))
    if (player1 > player2) {
      document.querySelector("h1").innerHTML = "🚩 Play 1 Wins!";
    }
    else if (player2 > player1) {
      document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
    }
    else {
      document.querySelector("h1").innerHTML = "Draw!";
    }
}

function setImg(number) {
  switch(number) {
    case 1:
      return "images/dice1.png";
    case 2:
      return "images/dice2.png";
    case 3:
      return "images/dice3.png";
    case 4:
      return "images/dice4.png";
    case 5:
      return "images/dice5.png";
    case 6:
      return "images/dice6.png";
    default:
      return "";
  }
}

function handleClick(){
  alert("I got clicked!");
}