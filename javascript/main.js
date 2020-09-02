import { stocks } from "./stocks.js";
import { changeStockValue, buyStock, getValue, updateWealth, sellStock, getHighlight, getPortfolio } from "./functions.js";

export let stockArray = [stocks.megaCorp, stocks.lunaBake, stocks.alphaComp, stocks.cannonRock];
let currentSelectedStock = 0;
let selectedStock = stockArray[currentSelectedStock];

export let user = {
    money: 2000,
    portfolio: [0, 0, 0, 0],
    value: 2000
}

for (let i = 0; i < stockArray.length; i++) {
    let stock = stockArray[i];
    document.getElementById(stock.document).innerHTML = `$${stock.value}`;
}

function switchSelected () {
    if (currentSelectedStock === (stockArray.length - 1)) {
        currentSelectedStock = 0;
    } else {
        currentSelectedStock++;
    }
}

function checkForAllBankrupt () {
    let allBank = true;
    for (let i = 0; i < stockArray.length; i++) {
        let stock = stockArray[i];
        if (stock.isBank === false) {
            allBank = false;
        }
    }
    return allBank;
}

function changeStock () {
    for (let i = 0; i < stockArray.length; i++) {
        let stock = stockArray[i];
        let newStock = Math.round(changeStockValue(stock));
        if (newStock > 0) {
            document.getElementById(stock.document).innerHTML = `$${newStock}`;
            stock.value = newStock;
        } else if (stock.isBank === true) {
            document.getElementById(stock.document).innerHTML = 'Bankrupt';
        } else {
            document.getElementById(stock.document).innerHTML = 'Bankrupt';
            stock.value = 0;
            currentSelectedStock = 0;
            stock.isBank = true;
            let bank = stockArray.indexOf(stock);
            stockArray.splice(bank, 1);
        }
    }
    getValue();
    if (checkForAllBankrupt() === true) {
        //window.location.href = '../results/lose.html';
    }
    clearInterval(timerRef);
    timerRef = setInterval(changeStock, 11500);
}
let timerRef = setInterval(changeStock, 11500);

updateWealth();
getPortfolio();

document.addEventListener('keydown', () => {
    if (event.keyCode === 69) {
        buyStock(selectedStock);
        getValue();
        getPortfolio();
    }
}, false);

document.addEventListener('keydown', () => {
    if (event.keyCode === 73) {
        sellStock(selectedStock);
        getValue();
        getPortfolio();
    }
}, false);

document.addEventListener('keydown', () => {
    if (event.keyCode === 68) {
        for (let i = 1; i <= 10; i++) {
            buyStock(selectedStock);
        }
        getValue();
        getPortfolio();
    }
})

document.addEventListener('keydown', () => {
    if (event.keyCode === 74) {
        for (let i = 1; i <= 10; i++) {
            sellStock(selectedStock);
        }
        getValue();
        getPortfolio();
    }
})

document.addEventListener('keydown', () => {
    if (event.keyCode === 87) {
        switchSelected();
        selectedStock = stockArray[currentSelectedStock];
        getHighlight(selectedStock);
    }
})
