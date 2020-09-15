const setPin = '365478';
let pin = '';
let currentPinIndex = 1;

function checkForPass () {
    if (setPin === pin) {
        alert('Passcode Correct');
    } else {
        alert('Passcode Incorrect. Try again');
    }
    window.location.reload();
}

function pressRegButton(key) {
    document.getElementById(key).classList.add('active');
    pin += document.getElementById(key).dataset.number;
    document.getElementById(`digit${currentPinIndex}`).classList.add('entered');
    currentPinIndex++;
    setTimeout(() => document.getElementById(key).classList.remove('active'), 300);
    if (currentPinIndex > 6) {
        checkForPass();
    }
}

function pressBackButton () {
    currentPinIndex--;
    document.getElementById(`digit${currentPinIndex}`).classList.remove('entered');
    let pinDigits = pin.split('');
    pinDigits.pop();
    pin = pinDigits.join('');
}

document.addEventListener('keypress', (event) => {
    if (event.key === '1') {
        pressRegButton('key1');
    } else if (event.key === '2') {
        pressRegButton('key2');
    } else if (event.key === '3') {
        pressRegButton('key3');
    } else if (event.key === '4') {
        pressRegButton('key4');
    } else if (event.key === '5') {
        pressRegButton('key5');
    } else if (event.key === '6') {
        pressRegButton('key6');
    } else if (event.key === '7') {
        pressRegButton('key7');
    } else if (event.key === '8') {
        pressRegButton('key8');
    } else if (event.key === '9') {
        pressRegButton('key9');
    } else if (event.key === '0') { 
        pressRegButton('key0');
    } else if (event.key === 'x') {
        pressBackButton();
    }
}, false);

function clickButton (button) {
    pressRegButton(button);
}