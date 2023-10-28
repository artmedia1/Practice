/* Higher Order Functions
    - This refers to the functions that are able to take functions as inputs
*/
    document.addEventListener("keypress", respondToKey(event));
    
    function respondToKey(event){
        console.log("Key Pressed");
    }

/* - In this case, addEventListener is an higher order as it takes a function as an input
    - respondToKey on the other hand, is a callback function. It allows us to wait for something to finish happening, in this case waiting for a keypress event. Then the callback function gets called back and executed.
    */