const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber: false
};
function updateDisplay() {
    document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}
function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}
function inputDigit(digit) {
    if(calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    } else {
        calculator.displayNumber += digit;
    }
}
function inverseNumber() {
    if(calculator.displayNumber === '0') {
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}
function handleOperator(operator) {
    if(!calculator.waitingForSecondNumber) {
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;
        //buat reset ulang display number (angka kedua setelah operator bisa dimulai pada display kosong)
        calculator.displayNumber = '0';
    } else {
        alert('Operator sudah ditetapkan')
    }
}
function performCalculation() {
    //logika OR, buat ngecek rules perhitungannya terpenuhi apa nggak
    if(calculator.firstNumber == null || calculator.operator == null) {
        //peringatan ini akan keluar klo hasil logikanya false
        alert("Anda belum menetapkan operator");
        return;
    }
    let result = 0;
    if(calculator.operator === "+") {
        //formula buat kalkulasi penjumlahan
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    } else {
        //formula buat kalkulasi pengurangan
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
    }
    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history);
    calculator.displayNumber = result;
    renderHistory();
}
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
    button.addEventListener('click', function(event) {
        // biar elemen tombol yg diklik masuk ke display
        const target = event.target;
        //biar fungsi tombol CE kepake buat restart kalkulator
        if(target.classList.contains('clear')) {
            clearCalculator();
            updateDisplay();
            return;
        }
        if(target.classList.contains('negative')) {
            inverseNumber();
            updateDisplay();
            return;
        }
        if(target.classList.contains('equals')) {
            performCalculation();
            updateDisplay();
            return;
        }
        if(target.classList.contains('operator')) {
            handleOperator(target.innerText)
            return;
        }
        inputDigit(target.innerText);
        updateDisplay()
    });
}