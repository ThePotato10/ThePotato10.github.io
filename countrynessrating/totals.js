import { readFileSync } from "fs";

let data = JSON.parse(readFileSync("./data.json").toString());
let totals = { god: 0, town: 0, girls: 0, trucks: 0, alcohol: 0, lines: 0 };

for (const [_key, val] of Object.entries(data)) {
    totals.god += val.god;
    totals.town += val.town;
    totals.girls += val.girls;
    totals.trucks += val.trucks;
    totals.alcohol += val.alcohol;
    totals.lines += val.lines;
}

console.log(totals);