// I know this is a terrible idea, but if you want to hijack my free api accounts be my guest
const weatherKey = "735186359aa74f3a8ce221257241709";
const photoKey = "SP1V+rOHiSohaRHAZHEmoQ==Lyzx97pyMh86rbte";
const stockKey = "JE75U6WvlkPuycYb8LqzUslej4Lak6C6";

// Option presets for weather and financial data
const cities  = ["London", "Mumbai", "New York", "Addis Ababa", "Sao Paolo", "Lima", "Perth", "Victoria", "Los Angeles", "Beijing", "Doha", "Athens", "Cape Town", "Paris", "Moscow", "Tokyo", "Shanghai", "Tashkent", "Cairo", "Malaga", "San Salvador", "Chicago", "Vancouver", "Nairobi"];
const tickers = ["AAPL", "AAL", "ACHC", "AIG", "APD", "CCOI", "DNUT", "CVX", "CYBR", "HSY", "LOGI", "LMT", "MTB", "SFM", "SHOP", "TMUS", "YUM"];

function chooseRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function processImage() {
    console.log(document.querySelector("#image-holder").children[0].src);

    return colorjs.prominent(document.querySelector("#image-holder").children[0].src, { amount: 1 }).then(color => {
        return color // [241, 221, 63]
    });
}

async function getData() {
    const issReq = await fetch("http://api.open-notify.org/iss-now.json");
    const issData = await issReq.json();

    const weatherReq = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherKey}&q=${chooseRandom(cities)}&aqi=no`);
    const weatherData = await weatherReq.json();

    const stockReq = await fetch(`https://financialmodelingprep.com/api/v3/stock-price-change/${chooseRandom(tickers)}?apikey=${stockKey}`);
    const stockData = await stockReq.json();

    const imageReq = await fetch(`https://api.api-ninjas.com/v1/randomimage`, {
        method: 'GET',
        headers: {
            'X-Api-Key': photoKey,
            'Accept': 'image/jpg'
        }
    });
    const imgURL = URL.createObjectURL(await imageReq.blob());
    
    const imgElement = document.createElement('img');
    imgElement.src = imgURL;
    document.getElementById('image-holder').appendChild(imgElement);

    const imageData = processImage();
    
    return {
        iss: {
            lat: issData.iss_position.latitude,
            long: issData.iss_position.longitude
        },
        weather: {
            temp: weatherData.current.temp_f,
            place: `${weatherData.location.name}, ${weatherData.location.country}`
        },
        stock: {
            change: stockData[0]["1D"],
            name: stockData[0].symbol
        },
        imageColor: await imageData
    };
}

function processData(data) {

    const canvas = document.querySelector("#canvas");
    const canvasX = canvas.width, canvasY = canvas.height;
    const adjustedX = Number(data.iss.long) + 180;
    const adjustedY = 90 - Number(data.iss.lat);

    return {
        xPos: canvasX * (adjustedX / 360),
        yPos: canvasY * (adjustedY / 180),
        weather: data.weather,
        stock: data.stock,
        imageColor: data.imageColor
    }
}

function drawCanvas() {
    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");

    dots.forEach(i => {
        i
        .then(data => processData(data))
        .then(processed => {

            ctx.beginPath();
            ctx.arc(processed.xPos, processed.yPos, (Number(processed.weather.temp) / 5), 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
        });
    });
}

let dots = [];

dots.push(getData());
drawCanvas();