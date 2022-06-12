let fnum = undefined;
let snum = undefined;
let operator = undefined;
let final = undefined;
let resetDisplay = false;
let absoluteResetDisplay = false;

function clear_display() {
    const dis = document.querySelector(".display");
    dis.textContent = "0";
    fnum = undefined;
    snum = undefined;
    operator = undefined;
    final = undefined;
    resetDisplay = false;
    absoluteResetDisplay = false;
}

function backspace() {
    const dis = document.querySelector(".display");
    curr_dis = dis.textContent;
    dis.textContent = curr_dis.slice(0,-1);
}


function addition (a, b) {return a+b;}
function subtract(a,b) {return a-b;}
function multiply(a,b) {return a*b;}
function divide(a,b) {

    if(b == 0) {
        const dis = document.querySelector(".display");
        dis.textContent = "Nope!";
        absoluteResetDisplay = true;
        return;
    }


    return a/b;
}


function operate(op, a, b) {

    let result = 0;
    if(op == "+") {
        result = addition(a,b);
    }
    else if (op == "-") {
        result = subtract(a,b);
    }
    else if (op == "*") {
        result = multiply(a,b);
    }
    else if (op == "/") {
        result = divide(a,b);
    }

    return result;
}

function prepare(op) {

    const dis = document.querySelector(".display");
    curr_dis = dis.textContent;

    if(curr_dis == "" || resetDisplay || absoluteResetDisplay) {console.log("no change"); return;}

    if(fnum == undefined || operator == undefined) {
        console.log("fnum == undefined || operator == undefined")
        resetDisplay = true;
        operator = op;
        fnum = parseFloat(curr_dis);
        return;
    }

    if(snum == undefined && fnum != undefined) {
        console.log("snum == undefined && fnum != undefined");
        resetDisplay = true;
        snum = parseFloat(curr_dis);
        final = operate(operator, fnum, snum);

        let final_converted = final.toString();
        
        if(final_converted.length > 10) {
            final_converted = final.toFixed(5);
        }

        dis.textContent = final_converted;
        fnum = final;
        operator = op;
        snum = undefined;
        return;
    }
}

function display(number) {

    const dis = document.querySelector(".display");
    curr_dis = dis.textContent;

    if(absoluteResetDisplay) {
        clear_display();
    }

    if(resetDisplay) {dis.textContent = ""; resetDisplay = false; console.log("resteDiaplsy now set to false");}

    if((curr_dis.includes(".") && number == ".") || curr_dis.length >= 10) {return;}

    if(dis.textContent=="0") {
        dis.textContent = number;
    }
    else {
        dis.textContent = dis.textContent+number;
    }
}

function equals() {

    if(absoluteResetDisplay) {return;}

    let final = 0;

    const dis = document.querySelector(".display");
    curr_dis = dis.textContent;
    
    if(fnum != undefined && curr_dis != "" && operator !=undefined) {

        snum = parseFloat(curr_dis);
        final = operate(operator, fnum, snum);

        let final_converted = final.toString();

        if(final_converted.length > 10) {
            final_converted = final.toFixed(5);
        }

        dis.textContent = final_converted;
        fnum = final;
        operator = undefined;
        snum = undefined;
    }
}