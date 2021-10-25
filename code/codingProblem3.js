function randFunc() {
    let randArray = [];
    let tbEl = document.getElementById("tb-1");
    let userInput = tbEl.value;
    let smallestNum;
    let largestNum;
    let randNum;
    
    for (let i = 0; i < userInput; i++) {
        randNum = getRandomNumber();
        randArray.push(randNum);
        if (i === 0) {
            smallestNum = randNum;
            largestNum = randNum;
        } 
        if (smallestNum > randNum) {
            smallestNum = randNum;
        }
        if (largestNum < randNum) {
            largestNum = randNum;
        }
    }

    let pText = "Random Array: " + randArray + "<br/>"
        + "Smallest Number: " + smallestNum + "<br/>"
        + "Largest Number: " + largestNum;

    setPText(pText);
}

function getRandomNumber() {
    return Math.floor(Math.random() * 10000);
}

function setPText(text) {
    let pEl = document.getElementById("pEl");
    pEl.innerHTML = text;
}