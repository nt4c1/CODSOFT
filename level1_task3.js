let disp = document.getElementById('disp');
let cInp = '';
let op = '';
let pInp = '';
let pAns = 0; 

function appendNumber(number) {
    if (cInp === '0' && number === '0') return; 
    cInp += number;
    disp.textContent = cInp;
}

function appendOperator(op1) {
    if (cInp === '' && pInp === '') return; 
    if (pInp !== '') calc(); 
    op = op1;
    pInp = cInp;
    cInp = '';
}

function calc() {
    let ccinp
    let ppinp
    if (cInp === '' || pInp === '' || op === '') return;
    let result;
    const prev = parseFloat(pInp);
    const cur = parseFloat(cInp);
    ccinp=cur;
    ppinp=pInp;

    if (isNaN(prev) || isNaN(cur)) return; 

    switch (op) {
        case '*':
            result = prev * cur;
            break;
        case '/':
            if (cur === 0) {
                alert("MATH ERROR!!! Division by zero.");
                clearDisplay();
                return;
            }
            result = prev / cur;
            break;
        case '+':
            result = prev + cur;
            break;
        case '-':
            result = prev - cur;
            break;
        default:
            return;
    }

    disp.textContent = result;
    pAns = result; 
    cInp = result.toString(); 
    pInp = '';
    op = ''; 
}

function clearDisplay() {
    cInp = '';
    pInp = '';
    op = '';
    disp.textContent = '0'; 
}

function deleteLast() {
    cInp = cInp.slice(0, -1); 
    disp.textContent = cInp || '0'; 
}

function usePreviousAnswer() {
    cInp = pAns.toString(); 
    disp.textContent = cInp;
}
