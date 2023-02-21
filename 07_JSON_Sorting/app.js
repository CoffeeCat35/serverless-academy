const axios = require('axios');
const fs = require("fs");

let countTrue = 0;
let countFalse = 0;

async function main() {
    filePath = fs.readFileSync("./JSONFiles.txt", 'utf-8');
    filePath = filePath.split('\n');

    let countError = 0;
    for (let i = 0; i < filePath.length; i++) {
        //console.log(filePath[i])
        await axios.get(filePath[i]).then(async (resp) => {
            test = resp.data;
            console.log(`[Success]: `);
            console.log(`${filePath[i]} `)
            GetNestedPathOfData(test);
        }).catch(async function (error) {
            if (error && countError < 3) {
                i--;
                countError++;
            }
            else if (error && countError == 3) {
                countError = 0;
                console.log(`[FAIL] The endpoint is unavailable - ${filePath[i]}\n`);
                return countError
            }
        })
    }

    console.log(`Found True values: ${countTrue}\nFound False values: ${countFalse}`);
}

main();

function GetNestedPathOfData(data) {
    for (var key in data) {
        if (typeof data[key] == 'object') { //if value of current key is object, we search for "isDone" in this object
            GetNestedPathOfData(data[key]);
        } else { //if value of current key is object, we check if current key "isDone"
            if (key == "isDone") {
                if (data[key] == true) countTrue++;
                else if (data[key] == false) countFalse++;
                console.log(key + ' - ' + data[key] + "\n");
            }
        }
    }
}