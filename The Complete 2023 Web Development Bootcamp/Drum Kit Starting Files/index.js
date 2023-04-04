
const button = document.querySelectorAll(".drum");

button.forEach(function(button) { //function(button) is an anonmynous function that adds eventlisteners but it is also the input for the forEach() function
    button.addEventListener('click', handleClick);
  });


function handleClick(){
    alert("I got clicked!");
}