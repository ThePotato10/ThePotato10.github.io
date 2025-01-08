let chart;
let notyf = new Notyf({ position: { x: "left", y: "bottom" } });

async function getLyrics(artist, song) {
    try {
        const resp = await fetch(`https://api.lyrics.ovh/v1/${encodeURI(artist)}/${encodeURI(song)}`);
        const data = await resp.json();

        return data.lyrics.split("\n").filter(i => i !== "");
    } catch (e) {
        return null;
    }
}

function hasGod(lyric) {
    const keywords = [" god", "heaven", "pray", "church", "lord", "angel", "jesus", "amen", "hallelujah", "blessing"];
    return keywords.some(word => lyric.toLowerCase().includes(word));
}

function hasTown(lyric) {
    const keywords = ["small town", "dirt road", "small-town", "gravel", "red dirt", "down the street", "back road", "mud", "hometown"];
    return keywords.some(word => lyric.toLowerCase().includes(word));
}

function hasGirls(lyric) {
    const keywords = ["baby", "babe", "you and me", "me and you", "you and i", "you love", "your love", "love you", "loving you", "loved you", "loves you", "girl", "kiss", "dress", "heart", "body", "pretty", "get laid", "woman", "your face", "earrings", "beautiful"];
    return keywords.some(word => lyric.toLowerCase().includes(word));
}

function hasTrucks(lyric) {
    const keywords = ["flatbed", "truck", "chevy", "ford", "windshield", "wheel", "pickup", "pick-up", "tires"];
    return keywords.some(word => lyric.toLowerCase().includes(word));
}

function hasAlcohol(lyric) {
    const keywords = [" bar", "drunk", "drink", "drank", "tipsy", "whiskey", "beer", "wine", "pour", "liquor", "buzz", "bourbon", "bottle", "tequila", "margarita", " rum"];
    return keywords.some(word => lyric.toLowerCase().includes(word));
}

async function getReferences(lyrics) {
    const references = { god: 0, town: 0, girls: 0, trucks: 0, alcohol: 0, lines: lyrics.length };

    lyrics.forEach(lyric => {
        if (hasGod(lyric)) references.god++;
        if (hasTown(lyric)) references.town++;
        if (hasGirls(lyric)) references.girls++;
        if (hasTrucks(lyric)) references.trucks++;
        if (hasAlcohol(lyric)) references.alcohol++;
    });

    return references;
}

async function loadJSONData(artist) {
    return fetch(`${window.location.href}/data.json`)
        .then(blob => blob.json())
        .then(data => {
            let res = {};

            if (artist in data) res.artist = data[artist];
            res.total = data.total;

            return res;
        });
}

function normalizeData(data) {
    if (data.artist === undefined) return {
        total: {
            god: Math.round((data.total.god / data.total.lines) * 1000) / 100,
            town: Math.round((data.total.town / data.total.lines) * 1000) / 100,
            girls: Math.round((data.total.girls / data.total.lines) * 1000) / 100,
            trucks: Math.round((data.total.trucks / data.total.lines) * 1000) / 100,
            alcohol: Math.round((data.total.alcohol / data.total.lines) * 1000) / 100
        },
        inputSong: {
            god: Math.round((data.inputSong.god / data.inputSong.lines) * 1000) / 100,
            town: Math.round((data.inputSong.town / data.inputSong.lines) * 1000) / 100,
            girls: Math.round((data.inputSong.girls / data.inputSong.lines) * 1000) / 100,
            trucks: Math.round((data.inputSong.trucks / data.inputSong.lines) * 1000) / 100,
            alcohol: Math.round((data.inputSong.alcohol / data.inputSong.lines) * 1000) / 100
        }
    }

    return {
        total: {
            god: Math.round((data.total.god / data.total.lines) * 1000) / 100,
            town: Math.round((data.total.town / data.total.lines) * 1000) / 100,
            girls: Math.round((data.total.girls / data.total.lines) * 1000) / 100,
            trucks: Math.round((data.total.trucks / data.total.lines) * 1000) / 100,
            alcohol: Math.round((data.total.alcohol / data.total.lines) * 1000) / 100
        },
        artist: {
            god: Math.round((data.artist.god / data.artist.lines) * 1000) / 100,
            town: Math.round((data.artist.town / data.artist.lines) * 1000) / 100,
            girls: Math.round((data.artist.girls / data.artist.lines) * 1000) / 100,
            trucks: Math.round((data.artist.trucks / data.artist.lines) * 1000) / 100,
            alcohol: Math.round((data.artist.alcohol / data.artist.lines) * 1000) / 100
        },
        inputSong: {
            god: Math.round((data.inputSong.god / data.inputSong.lines) * 1000) / 100,
            town: Math.round((data.inputSong.town / data.inputSong.lines) * 1000) / 100,
            girls: Math.round((data.inputSong.girls / data.inputSong.lines) * 1000) / 100,
            trucks: Math.round((data.inputSong.trucks / data.inputSong.lines) * 1000) / 100,
            alcohol: Math.round((data.inputSong.alcohol / data.inputSong.lines) * 1000) / 100
        }
    }
}

function drawCharts(data, labels) {
    const ctx = document.getElementById('canvas');

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [
                { label: labels[0], data: data.total, stack: "Stack 0" },
                { label: labels[1], data: data.artist, stack: "Stack 1" },
                { label: labels[2], data: data.inputSong, stack: "Stack 2" }
            ]
        },
        options: {
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            interaction: { intersect: true },
            plugins: { title: { display: true, text: 'References Per 10 Lines' } }
        }
    });
}

function most(arr, fn) {
    let threshold = Math.floor(arr.length / 2);
    let count = 0;

    arr.forEach((n, i) => {
        if (fn(n, i)) count++;
    });

    if (count > threshold) return true;
    return false;
}

function generateText(referencesArray) {
    const baseline = [0.2, 0.1, 1.2, 0.1, 0.6];

    if (referencesArray.every(n => n > 0)) {
        if (most(referencesArray, ((n, i) => n > baseline[i]))) {
            document.querySelector("#meter").setAttribute("value", 4)
            return "Yeehaw Pardner! This song is country all the way! 🤠";
        } else {
            document.querySelector("#meter").setAttribute("value", 3)
            return "Good country! It's not all moonshine and red dirt, but this song hits all five cliches";
        }
    } else if (most(referencesArray, n => n > 0)) {
        document.querySelector("#meter").setAttribute("value", 2)
        return "Not bad. This song lives in the city but still yearns for the country roads";
    } else if (referencesArray.some(n => n > 0)) {
        document.querySelector("#meter").setAttribute("value", 1)
        return "Could be worse. This song loves the city, but there's a flicker of country in there";
    } else {
        document.querySelector("#meter").setAttribute("value", 0)
        return "This song is less country than a Californian Democrat studying Critical Race Theory at NYU";
    }
}

async function onInput() {
    if (chart) chart.destroy();

    const song = document.querySelector("#songInput").value;
    const artist = document.querySelector("#artistInput").value;

    document.querySelector("#loader").classList.remove("loader-hide");
 
    const lyrics = await getLyrics(artist, song);

    if (lyrics === null) {
        document.querySelector("#loader").classList.add("loader-hide");
        notyf.error("Sorry, but the lyrics for that song couldn't be found");
    } else {
        const references = await getReferences(lyrics);
        const data = await loadJSONData(artist);

        data.inputSong = references;

        // draw some graphs and shit here
        let normalized = normalizeData(data);

        document.querySelector("#loader").classList.add("loader-hide");

        drawCharts(normalized, ["All Country", `All ${artist} songs`, song]);
        document.querySelector("#textOutput").textContent = generateText(Object.values(normalized.inputSong));
    }
}
