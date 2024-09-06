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
    let a = parseInt(strA);
    let b = parseInt(strB);
    let result = 0;
    switch(operation){
        case "+":
            result =add(a, b);
            break;
        case "-":
            result =subtract(a,b);
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
    const buttonValue = e.target.innerText;
    if (OPERATIONS.includes(buttonValue)){
        callStack.push(buttonValue, "");
        console.log(callStack);
        return;
    }
    if(buttonValue === "="){
        if (callStack.length < 3) return;
        let [strA, strB, operation] = [callStack[0], callStack[2], callStack[1]]
        const result = operate(strA, strB, operation);
        updateDisplay(result);
        callStack = [result];
        return;
    }
    callStack[callStack.length-1] = callStack[callStack.length-1].concat(buttonValue);
    console.log(callStack);
 }

const calculatorBody = document.getElementById("calculator-button-body");
calculatorBody.addEventListener("click", buttonClick);