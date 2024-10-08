let callStack = ["0"];
const OPERATIONS = ["+", "-", "*", "/"];
function add(a, b){
    return a + b;
}
function subtract(a, b){
    return a -  b;
}
function multiply(a, b){
    return a * b;
}
function divide(a, b){
    return a / b;
}
function operate(strA, strB, operation){
    let a = parseFloat(strA);
    let b = parseFloat(strB);
    let result = 0;
    switch(operation){
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a,b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a,b);
            break;
        default:
            result = "OOPS!";
    }
    return result.toFixed(4).replace(/\.?0+$/, "");
}

function getDisplayTextElement(){
    return document.getElementById("calculator-display-text");
}

function updateDisplay(newValue){
    getDisplayTextElement().innerText = newValue;
}
function doesDisplayHaveDec(){
    let currentValue = getDisplayTextElement().innerText.split("");
    return (currentValue.includes("."));
}
function placeDecimal(decimalAlready){
    if(!decimalAlready){
        updateDisplay(concatCurrentItem("."));
    }
}
function calculateAndUpdate(){
    let [strA, strB, operation] = [callStack[0], callStack[2], callStack[1]]
    const result = operate(strA, strB, operation).toString();
    updateDisplay(result);
    callStack = [result];
 }
 function concatCurrentItem(strToConcat){
    let currentItem = callStack[callStack.length-1];
    if ((currentItem === "0" && strToConcat !== ".") || (currentItem !== "-" && OPERATIONS.includes(currentItem))) {
        currentItem = "";
    }
    currentItem = currentItem.concat(strToConcat);
    callStack[callStack.length-1] = currentItem;
    return currentItem;
 }
function handleDeletePress(){
    let currentItem = callStack[callStack.length - 1];
    if(currentItem.length > 1){
        currentItem = currentItem.slice(0, -1);
    }else if((currentItem === "" || currentItem === "0") && OPERATIONS.includes(callStack[callStack.length-2])){
        callStack.splice(1, 2);
        currentItem = callStack[0];
    }else{
        currentItem = "0";
    }
    callStack[callStack.length -1] = currentItem;
    updateDisplay(currentItem);
 }
 function handleOperationPress(buttonValue){
    if(callStack[callStack.length-1] === ""){
        callStack.splice(1, 2);
    }else if(callStack.length === 3){
        calculateAndUpdate();
    }
    callStack.push(buttonValue, "");
}
function changeSignOfCurrentItem(){
    const currentItem = callStack[callStack.length-1];
        if(currentItem === "" || currentItem === "0"){
            callStack[callStack.length - 1] = "-";
        }
        else if(currentItem === "-"){
            callStack[callStack.length - 1] = "";
        }else if(currentItem.slice(0, 1) !== "-"){
            callStack[callStack.length - 1] = "-" + currentItem;
        }
        else{
            callStack[callStack.length - 1] = currentItem.slice(1);
        }
        updateDisplay(callStack[callStack.length-1])
}
function buttonClick(e){
    if (e.target === document.getElementById('calculator-button-body') || e.target.className === "calculator-button-row") return;
    const buttonValue = e.target.innerText;
    if (OPERATIONS.includes(buttonValue)){
        handleOperationPress(buttonValue);
    }
    else if(buttonValue === "."){
        const decimalAlready = doesDisplayHaveDec();
        placeDecimal(decimalAlready);
    }
    else if(buttonValue === "="){
        if (callStack.length < 3) return;
        calculateAndUpdate();
    }
    else if(buttonValue === "+/-"){
        changeSignOfCurrentItem();
    }
    else if(buttonValue === "DEL"){
        handleDeletePress();
    }
    else if(buttonValue === "AC"){
        callStack = ["0"];
        updateDisplay("0");
    }
    else{
        updateDisplay(concatCurrentItem(buttonValue));
    }
 }

const calculatorBody = document.getElementById("calculator-button-body");
calculatorBody.addEventListener("click", buttonClick);