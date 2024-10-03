function processResult(result) {
    document.querySelector("#table").innerHTML += `<tr><td>${result.events}</td><td>${(result.score / 100).toFixed(2)}%</td>`;
}

function search() {
    document.querySelector("#table").innerHTML = "";

    let query = document.querySelector("#search").value;

    let searchRegex = new RegExp(`^${query}.+`);

    fetch(window.location.href + "correlations.json")
        .then(res => res.json())
        .then(data => data.filter(i => i.events.match(searchRegex)))
        .then(filtered => filtered.sort((a, b) => b.score - a.score))
        .then(sorted => sorted.forEach(i => processResult(i)));

    document.querySelector("#search").value = "";
}

document.querySelector("#search").addEventListener("keypress", (event) => {
    if (event.key == "Enter") search();
});