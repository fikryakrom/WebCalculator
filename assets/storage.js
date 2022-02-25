const CACHE_KEY = "calculation_history";
    /* ini adl key to access and save data to localStorage
    localStorage cuma bisa nyimpen data primitif, kyk string */
function checkForStorage() {
    return typeof(Storage) !== "undefined"
}
function putHistory(data) {
    // fungsi buat nyimpen data riwayat kalkulasi
    if(checkForStorage()) {
        let historyData = null;
        if(localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
            /* JSON.parse(): ngubah string jadi objek JavaScript
            lawannya adl JSON.stringify() */
        }
        historyData.unshift(data);
            // unshift(): dipake untuk nambahin nilai baru di array, posisi: awal index array
        if(historyData.length > 5) {
            historyData.pop();
            /* pop(): ngehapus nilai index terakhir di array
            realisasi fungsi: hanya 5 riwayat kalkulasi terbaru/terakhir yg muncul */
        }
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
}
function showHistory() {
    // fungsi buat dapetin data dari localStorage
    if(checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}
function renderHistory() {
    const historyData = showHistory();
    let historyList = document.querySelector("#historyList");
    // selalu hapus konten HTML pada elemen historyList, agar ga muncul data ganda
    historyList.innerHTML = "";
    for(let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>"
        row.innerHTML += "<td>" + history.operator + "</td>"
        row.innerHTML += "<td>" + history.secondNumber + "</td>"
        row.innerHTML += "<td>" + history.result + "</td>"
        historyList.appendChild(row);
    }
}
// memunculkan data history ketika web pertama kali dibuka
renderHistory();