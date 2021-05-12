const fs = require("fs");
fs.readFile('./properties.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let lineByLine = data.split("\n");
    let res = [];
    for (let i = 0; i < lineByLine.length; i++) {
        const element = lineByLine[i];
        res.push(element.split(":")[0]);
    }
    console.log(JSON.stringify(res));
});