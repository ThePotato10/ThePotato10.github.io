/* For any learning programmer that's taking the time to read my source code;
I know programming seems tough, but trust me, it's worth it */

/* Also, don't be the asshole that inserts a random semicolon into your friend's 
code. Nobody deserves that*/
let objectArray = [];
let updateCounter = 0;
let dataPointNumber = 3;
let arrayNumber = 0;
let counter = 0;
let isPaused = false;
function createObject (exercise, duration, restDuration) {
    objectArray.push({
        exercise: exercise,
        duration:  duration,
        restDuration: restDuration,
        completed: false
    });
};
function addInputOption () {
    dataPointNumber = dataPointNumber + 1;
    let newData = document.createElement('tr');
    let newDataContentOne = document.createElement('td');
    let newDataContentTwo = document.createElement('td');
    let newDataContentThree = document.createElement('td');
    let NDFO = document.createElement('input');
    let NDFT = document.createElement('input');
    let NDFTH = document.createElement('input');
    NDFO.setAttribute('type', 'text');
    NDFO.setAttribute('id', `x-${dataPointNumber}`);
    NDFT.setAttribute('type', 'number');
    NDFT.setAttribute('id', `y-${dataPointNumber}`);
    NDFTH.setAttribute('type', 'text');
    NDFTH.setAttribute('id', `z-${dataPointNumber}`);
    newDataContentOne.appendChild(NDFO);
    newDataContentTwo.appendChild(NDFT);
    newDataContentThree.appendChild(NDFTH);
    newData.appendChild(newDataContentOne);
    newData.appendChild(newDataContentTwo);
    newData.appendChild(newDataContentThree);
    let tbody = document.getElementById('tableB');
    let newNode = tbody.insertBefore(newData, null);
};
function deleteInputOption () {
    if (counter < 1) {
        dataPointNumber -= 1;
        let removedDataX = document.getElementById(`x-${dataPointNumber + 1}`);
        let removedDataY = document.getElementById(`y-${dataPointNumber + 1}`);
        let removedDataZ = document.getElementById(`z-${dataPointNumber + 1}`);
        removedDataX.remove();
        removedDataY.remove();
        removedDataZ.remove();
    } else {
        alert("Error: Deletion of data detected. Reload webpage to delete data and start again");
    }; 
};
// If someone tells you your code has a bug, tell them its a feature
function submit () {
    if (arrayNumber != dataPointNumber) {
        for (let i = 1; i <= dataPointNumber - arrayNumber; i++) {
            let k = i + arrayNumber;
            createObject(document.getElementById(`x-${k}`).value, document.getElementById(`y-${k}`).value, document.getElementById(`z-${k}`).value);
        };
        arrayNumber += objectArray.length;
        counter++;
        makeList();
        displayTimer();
        hideImage();
        document.getElementById('paused').innerHTML = 'The Timer Is Running'
    } else {
        alert("Error: Resubmission of same data detected");
    };
};
function makeList () {
    for (let i = 0; i < objectArray.length; i++) {
        let newListItem = document.createElement('li');
        let insertPlace = document.getElementById('list');
        if (i === 0) {
            let newListItemContent = document.createTextNode(`First you have ${objectArray[i].exercise} for ${objectArray[i].duration} seconds. And then you have ${objectArray[i].restDuration} seconds of rest.`);
            newListItem.appendChild(newListItemContent);
            let newNode = insertPlace.insertBefore(newListItem, null);
        } else if (i === objectArray.length - 1) {
            let NLICT = document.createTextNode(`Finally you have ${objectArray[i].exercise} for ${objectArray[i].duration} seconds.`);
            newListItem.appendChild(NLICT);
            let newNode = insertPlace.insertBefore(newListItem, null);
        } else {
            let NLICTH = document.createTextNode(`Next you have ${objectArray[i].exercise} for ${objectArray[i].duration} seconds. And then you have ${objectArray[i].restDuration} seconds of rest.`);
            newListItem.appendChild(NLICTH);
            let newNode = insertPlace.insertBefore(newListItem, null);
        };
    };
};
// Syntax Error Poem:
// Roses are red
// Violets are blue
// Unexected '}' on line 32
let y = 0
var timerRef;
function displayTimer () {
    if (isPaused != true) {
        if (objectArray[y].duration < 60) {
            if (objectArray[y].duration < 10) {
                document.getElementById('timer').innerHTML = `00:0${objectArray[y].duration}`;
                clearInterval(timerRef);
                timerRef = setInterval(timerCountDown, 1000);
            } else {
                document.getElementById('timer').innerHTML = `00:${objectArray[y].duration}`;
                clearInterval(timerRef);
                timerRef = setInterval(timerCountDown, 1000);
            };
        } else {
            let counter = 0;
            let copiedVar = objectArray[y].duration;
            while (copiedVar - 60 >= 0) {
                counter++;
                copiedVar -= 60;
            };
            if (copiedVar < 10) {
                document.getElementById('timer').innerHTML = `0${counter}:0${copiedVar}`;
                clearInterval(timerRef);
                timerRef = setInterval(timerCountDown, 1000);
            } else {
                document.getElementById('timer').innerHTML = `0${counter}:${copiedVar}`;
                clearInterval(timerRef);
                timerRef = setInterval(timerCountDown, 1000);
            };
        };
    };
};
function displayTimerRest () {
    if (isPaused != true) {
        if (objectArray[y].restDuration < 60) {
            if (objectArray[y].restDuration < 10) {
                document.getElementById('timer').innerHTML = `00:0${objectArray[y].restDuration}`;
                clearInterval(timerRef);
                timerRef = setInterval(timerCountDownRest, 1000);
            } else {
                document.getElementById('timer').innerHTML = `00:${objectArray[y].restDuration}`;
                clearInterval(timerRef);
                timerRef = setInterval(timerCountDownRest, 1000);
            };
        } else {
            let counter = 0;
            let copiedVar = objectArray[y].restDuration;
            while (copiedVar - 60 >= 0) {
                counter++;
                copiedVar -= 60;
            };
            if (copiedVar < 10) {
                document.getElementById('timer').innerHTML = `0${counter}:0${copiedVar}`;
                clearInterval(timerRef);
                timerRef = setInterval(timerCountDownRest, 1000);
            } else {
                document.getElementById('timer').innerHTML = `0${counter}:${copiedVar}`;
                clearInterval(timerRef);
                timerRef = setInterval(timerCountDownRest, 1000);
            };
        };
    };
};
function timerCountDown () {
    if (isPaused != true) {
        if (objectArray[y].duration > 0) {
            objectArray[y].duration -= 1;
            displayTimer();
        } else {
            playSound();
            displayTimerRest();
        };
    };
};
function timerCountDownRest () {
    if (isPaused != true) {
        if (objectArray[y].restDuration > 0) {
            objectArray[y].restDuration -= 1;
            displayTimerRest();
        } else {
          y++;
          playSound();
          displayTimer(); 
        };
    };
};
function togglePause () {
    let html = document.getElementById('paused');
    if (isPaused === true) {
        isPaused = false;
        html.innerHTML = 'The Timer Is Running'
    } else {
        isPaused = true;
        html.innerHTML = 'The Timer Is Paused'
    };
};
function hideImage () {
    if (document.querySelectorAll("#list li").length > 3) {
        let img = document.getElementById('sleep');
        img.style.visibility = 'hidden';
    }
};
let soundID = 'ding'
function loadSound () {
    createjs.Sound.registerSound("ding.wav", soundID);
    alert("This page was designed to be used in landscape mode");
}
function toggleCanRun () {
    console.log("called!");
    canRun = true;
    clearTimeout(timer);
};
let timer;
let canRun = true;
function playSound () {
    if (canRun === true) {
        createjs.Sound.play(soundID);
        canRun = false;
        timer = setTimeout(toggleCanRun, 2000);
    }
};