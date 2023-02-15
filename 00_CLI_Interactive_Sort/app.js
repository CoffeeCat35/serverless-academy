const SortForWords = require('./SortForWords');
const SortForNumbers = require('./SortForNumbers');
const SortWordsByTheirLength = require('./SortWordsByTheirLength');
const UniqueWords = require('./UniqueWords');
const UniqueWordsAndNUmbers = require('./UniqueWordsAndNUmbers');

const readline = require('readline').createInterface({                   //requirer to get user input
    input: process.stdin,
    output: process.stdout
});

var recursiveFunction = function () {
    readline.question("Hello! Write 10 words ", function (words) {
        var wordsArray = words.split(' ');                              //split words from input by space
        if (wordsArray.length != 10) {                                  //if there are less or more than 10 words
            console.log("There aren\'t 10 words:( Try again!");         //send message about error and this function to try again
            recursiveFunction();
        }
        readline.question("There are some functions that you can do:"
            + "\n1. Sort words alphabetically"
            + "\n2. Show numbers from lesser to greater"
            + "\n3. Show numbers from bigger to smaller"
            + "\n4. Display words in ascending order by number of letters in the word"
            + "\n5. Show only unique words"
            + "\n6. Display only unique values from the set of words and numbers entered by the user"
            + "\n7. To exit the program write `exit`\nWrite the number:", function (number) {
                if (number == 'exit') return readline.close();           //To exit the program write
                switch (number) {
                    case '1': SortForWords(wordsArray); break;           //Sort words alphabetically
                    case '2': SortForNumbers(wordsArray, 1); break;      //Show numbers from lesser to greater
                    case '3': SortForNumbers(wordsArray, -1); break;     //Show numbers from bigger to smaller
                    case '4': SortWordsByTheirLength(wordsArray); break; //Display words in ascending order by number of letters in the word
                    case '5': UniqueWords(wordsArray); break;            //Show only unique words
                    case '6': UniqueWordsAndNUmbers(wordsArray); break;  //Display only unique values from the set of words and numbers entered by the user
                }
                recursiveFunction();                                     //call this function again
            });

    });
}

recursiveFunction();