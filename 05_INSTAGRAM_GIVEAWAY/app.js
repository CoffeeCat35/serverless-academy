const fs = require("fs");
const mergeSort = require('./mergeSort');
const binarySearch = require('./binarySearch');

var DataFromFile = [];
var AllUniqueNickNames = [];
var AllDataInOneVariable = '';

function main() {
    ReadFromFile();

    uniqueValues(AllDataInOneVariable); //Determine how many unique usernames there are in all the specified files
    existInAllFiles(); //Determine how many usernames occur in all 20 files;
    existInAtleastTen(); //Find out how many usernames occur in at least 10 files.
}

main();

function ReadFromFile() {
    for (var i = 0; i < 20; i++) {
        var filePath = './Files/out' + i + '.txt'; //Path to all files using iteration
        DataFromFile[i] = fs.readFileSync(filePath, 'utf-8'); // two-dimensional array for separating data from different files
        AllDataInOneVariable += fs.readFileSync(filePath, 'utf-8'); // array for all data from all files
        DataFromFile[i] = SplitAndSort(DataFromFile[i]);
    }
}

function SplitAndSort(array) {
    array = array.split('\n');
    mergeSort(array, 0, array.length - 1);
    return array;
}

function uniqueValues(AllDataInOne) {
    AllDataInOne = SplitAndSort(AllDataInOne);

    var unique = 0;
    var nonUnique = 0;
    for (let i = 0; i < AllDataInOne.length;) {           //Loop to find if after chosen element there are the same elements
        if ((i + nonUnique) < AllDataInOne.length && AllDataInOne[i] == AllDataInOne[i + nonUnique + 1]) nonUnique++;         //if yes we incriminate nonUnique by one
        else if (AllDataInOne[i] != AllDataInOne[i + nonUnique + 1] && nonUnique == 0) { unique++; AllUniqueNickNames.push(AllDataInOne[i]); i++; }  //if no we send it to console
        else if (AllDataInOne[i] != AllDataInOne[i + nonUnique + 1] && nonUnique != 0) {
            i += nonUnique + 1; nonUnique = 0; unique++;
            AllUniqueNickNames.push(AllDataInOne[i]);
        }
    }
    console.log(unique);
}

function existInAllFiles() {
    console.log(CountNickNamesThatExistAtLeastIn(20));
}

function existInAtleastTen() {
    console.log(CountNickNamesThatExistAtLeastIn(10));
}

function CountNickNamesThatExistAtLeastIn(NumberOfFiles) {  //check each unique nickname in each file
    //console.log(fromFile[0]);
    var countNickNames = 0;
    for (var i = 0; i < AllUniqueNickNames.length; i++) {
        var InHowManyFilesNickNameExist = 0;
        InHowManyFilesNickNameExist = Count(InHowManyFilesNickNameExist, AllUniqueNickNames[i]);
        if (NickNameAtLeastInNumberOfFiles(InHowManyFilesNickNameExist, NumberOfFiles)) countNickNames++;
    }
    return countNickNames;
}

function Count(InHowManyFilesNickNameExist, array) {
    for (var j = 0; j < DataFromFile.length; j++) {
        if (binarySearch(DataFromFile[j], 0, DataFromFile[j].length - 1, array)) InHowManyFilesNickNameExist++;
    }
    return InHowManyFilesNickNameExist;
}

function NickNameAtLeastInNumberOfFiles(InHowManyFilesExist, NumberOfFiles) {
    return InHowManyFilesExist >= NumberOfFiles;
}