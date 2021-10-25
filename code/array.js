console.log("Hello world!");

let userInputArray = [];

function handleTypeText() {
    let tbEl = document.getElementById("tbEl");
    let pEl = document.getElementById("pEl");
    let text = tbEl.value;
    userInputArray.push(text);

    let ulStr = "<ul>";
    for (let x = 0; x < userInputArray.length; x++) {
        ulStr = ulStr + "<li>" + userInputArray[x] + "</li>";
    }
    ulStr = ulStr + "</ul>";
    pEl.innerHTML = ulStr;
    tbEl.value = "";
}