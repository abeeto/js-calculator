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
function operate(a, b, operate){
    let result = 0;
    switch(operate){
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