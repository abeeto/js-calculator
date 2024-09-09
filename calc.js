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
function decideOnDecimal(decimalAlready){
    if(!decimalAlready){
        updateDisplay(concatLastItem("."));
    }
}
function calculateAndUpdate(){
    let [strA, strB, operation] = [callStack[0], callStack[2], callStack[1]]
    const result = operate(strA, strB, operation).toString();
    updateDisplay(result);
    callStack = [result];
 }
 function concatLastItem(strToConcat){
    let lastItem = callStack[callStack.length-1];
    console.log("hi.")
    if ((lastItem === "0" && strToConcat !== ".") || OPERATIONS.includes(lastItem)) {
        lastItem = "";
    }
    lastItem = lastItem.concat(strToConcat);
    callStack[callStack.length-1] = lastItem;
    console.log(callStack);
    return lastItem;
 }
function deleteValueInStack(){
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
function buttonClick(e){
    if (e.target === document.getElementById('calculator-button-body') || e.target.className === "calculator-button-row") return;
    const buttonValue = e.target.innerText;
    if (OPERATIONS.includes(buttonValue)){
        if(callStack[callStack.length-1] === ""){
            callStack.splice(1, 2);
        }else if(callStack.length === 3){
            calculateAndUpdate();
        }
        callStack.push(buttonValue, "");
        console.log(callStack);
    }
    else if(buttonValue === "."){
        const decimalAlready = doesDisplayHaveDec();
        decideOnDecimal(decimalAlready);
    }
    else if(buttonValue === "="){
        if (callStack.length < 3) return;
        calculateAndUpdate();
    }
    else if(buttonValue === "+/-"){
        const lastItem = callStack[callStack.length-1];
        if(lastItem === "0") return;
        if(lastItem.slice(0, 1) !== "-"){
            callStack[callStack.length - 1] = "-" + lastItem;
        }else{
            callStack[callStack.length - 1] = lastItem.slice(1);
        }
        updateDisplay(callStack[callStack.length-1])
    }
    else if(buttonValue === "DEL"){
        deleteValueInStack();
    }
    else if(buttonValue === "AC"){
        callStack = ["0"];
        updateDisplay("0");
    }
    else{
        updateDisplay(concatLastItem(buttonValue));
    }
 }

const calculatorBody = document.getElementById("calculator-button-body");
calculatorBody.addEventListener("click", buttonClick);