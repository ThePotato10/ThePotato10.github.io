import { user } from "./main.js"
import { stocks } from "./stocks.js"

export function changeStockValue (selectedStock) {
    let randomNumber = Math.random() + 5;
    randomNumber = Math.round(randomNumber);
    let plusOrMinus = Math.floor(Math.random() * 14);
    if (selectedStock.trend === "plus") {
        if (plusOrMinus < 11) {
            document.getElementById(selectedStock.document).style.color = '#33cc73';
            return selectedStock.value += randomNumber;
        } else {
            selectedStock.trend = "minus";
            document.getElementById(selectedStock.document).style.color = '#fc1373';
            return selectedStock.value -= (randomNumber + 2);
        }
    } else {
        if (plusOrMinus <= 9) {
            document.getElementById(selectedStock.document).style.color = '#fc1373';
            return selectedStock.value -= (randomNumber + 2);
        } else {
            selectedStock.trend = "plus";
            document.getElementById(selectedStock.document).style.color = '#33cc73';
            return selectedStock.value += randomNumber;
        }
    }
}

export function getValue () {
    let worth = user.money;
    let cannon = stocks.cannonRock.value * user.portfolio[3];
    let alpha = stocks.alphaComp.value * user.portfolio[2];
    let luna = stocks.lunaBake.value * user.portfolio[1];
    let mega = stocks.megaCorp.value * user.portfolio[0];
    worth += cannon;
    worth += alpha;
    worth += luna;
    worth += mega;
    if (worth < 1200) {
        window.location.href = "/stocks-game/results/lose.html"
    } else if (worth > 7000) {
        window.location.href = "/stocks-game/results/win.html"
    } else {
        user.value = worth;
        updateWealth();
    }  
}

export function updateWealth () {
    document.getElementById('user-money').innerHTML = `You currently have $${user.money}`;
    document.getElementById('user-value').innerHTML = `Your portfolio is worth $${user.value}`;
}

export function buyStock (selectedStock) {
    user.money -= selectedStock.value;
    user.portfolio[selectedStock.portIn] += 1;
}

export function sellStock (selectedStock) {
    if (user.portfolio[selectedStock.portIn] > 0) {
        user.money += selectedStock.value;
        user.portfolio[selectedStock.portIn] -= 1;
    }
}

export function getHighlight (selectedStock) {
    let y = document.querySelector('.selected');
    y.classList.add('not-selected');
    y.classList.remove('selected');
    let x = document.getElementById(selectedStock.altDoc);
    x.classList.remove('not-selected');
    x.classList.add('selected');
}

export function getPortfolio () {
    document.getElementById('mega!').innerHTML = `You have ${user.portfolio[0]} shares of MegaCorp`
    document.getElementById('luna!').innerHTML = `You have ${user.portfolio[1]} shares of Luna Baking`
    document.getElementById('alpha!').innerHTML = `You have ${user.portfolio[2]} shares of Alpha Computing`
    document.getElementById('cann!').innerHTML = `You have ${user.portfolio[3]} shares of Cannon Rocketry`
}
