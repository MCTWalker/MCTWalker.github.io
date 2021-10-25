let randNum = Math.floor(Math.random() * 10000);
console.log(randNum);

function isOdd(num) {
    let remainder = num % 2;
    if (remainder === 0) {
        return false;
    } else {
        return true;
    }
}

function setPText() {
    let oddBool = isOdd(randNum);
    let pEl = document.getElementById("oddOrEvenP");
    if (oddBool === true) {
        pEl.innerText = randNum + " which is: ODD!";
    } else {
        pEl.innerText = randNum + " which is: EVEN!";
    }
}

setPText();