let callStack = [""];
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
    let a = parseInt(strA);
    let b = parseInt(strB);
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
    return result;
}

function getDisplayTextElement(){
    return document.getElementById("calculator-display-text");
}

function updateDisplay(newValue){
    getDisplayTextElement().innerText = newValue;
}

function buttonClick(e){
    if (e.target === document.getElementById('calculator-button-body') || e.target.className === "calculator-button-row") return;
    const buttonValue = e.target.innerText;
    if (OPERATIONS.includes(buttonValue)){
        if(callStack[callStack.length-1] === ""){
            callStack.splice(1, 2);
        }
        callStack.push(buttonValue, "");
        console.log(callStack);
        return;
    }
    else if(buttonValue === "="){
        if (callStack.length < 3) return;
        let [strA, strB, operation] = [callStack[0], callStack[2], callStack[1]]
        const result = operate(strA, strB, operation).toString();
        updateDisplay(result);
        callStack = [result];
    }
    else if(buttonValue === "DEL"){
        let currentItem = callStack[callStack.length - 1];
        currentItem  = currentItem.length > 1 ? currentItem.slice(0, -1) : "0";
        callStack[callStack.length -1] = currentItem;
        updateDisplay(currentItem);
    }
    else if(buttonValue === "AC"){
        callStack = [""];
        updateDisplay("0");
    }
    else{
        let lastItem = callStack[callStack.length-1];
        if (lastItem === "0" || OPERATIONS.includes(lastItem)) {
            lastItem = "";
        }
        lastItem = lastItem.concat(buttonValue);
        updateDisplay(lastItem);
        
        callStack[callStack.length-1] = lastItem;
        console.log(callStack);
    }
 }
const calculatorBody = document.getElementById("calculator-button-body");
calculatorBody.addEventListener("click", buttonClick);