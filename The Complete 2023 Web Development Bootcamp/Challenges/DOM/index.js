

function clickme(){
    var test = document.querySelector('.list:nth-child(3)');
    // firstElementChild.lastElementChild.getElementsByClassName('list')[2];
    test.textContent = "Hello";
}

function clickme2(){
    var test = document.querySelector('.list:nth-child(1) a');
    // firstElementChild.lastElementChild.getElementsByClassName('list')[2];
    //console.log(test);
    test.click();
}

function clickme3(){
    var test = document.querySelectorAll('.list');
    // firstElementChild.lastElementChild.getElementsByClassName('list')[2];
    for (var temp of test){
        if (temp.textContent != "Second"){
            var link = temp.querySelector('a');
            if (link !== null){
                link.style.color = "red";
            }
            else{
                temp.innerHTML = "<strong>What</strong>";
            }
        }
    }
}

function changeBtnColor(){
    var btn = document.querySelector('button');
    btn.classList.toggle("redBtn");
}

function hugeText(){
    var text = document.querySelector('h1');
    text.classList.toggle("huge");
}