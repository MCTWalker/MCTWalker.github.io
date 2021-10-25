console.log("Hello world!");

let documentAccessibleVar = "Hello I exist!";
var param = "I should be accessible everywhere";
window.aWindowVar = "I'm on the window object!";

function clickFn(eventObj) {
    console.log("I was clicked!");
    console.log(eventObj);

    let btnElement = eventObj.srcElement;
    btnElement.innerText = "I was changed";
    btnElement.classList.remove("aquaBackground");
    btnElement.classList.add("redBackground");

    btnElement.style.backgroundColor = "aqua";

   
    {   
        let functionAccessibleVar = "Hello I'm inside of a function!";
        var anotherVarThatIs = "Hello I'm oddly accesible outside this block";
        console.log("first log:", functionAccessibleVar);
        console.log("first log:", anotherVarThatIs);
    }
    console.log("second log:", anotherVarThatIs);
    console.log("second log:", functionAccessibleVar);
}

document
    .getElementById("myBtn")
    .addEventListener("click", clickFn);