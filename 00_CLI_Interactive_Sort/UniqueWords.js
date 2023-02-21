//Show only unique words
function UniqueWords(Array) {
    let ArrayOfWords = [];                                          //Create new array for words
    Array.forEach(newElement => {
        if (isNaN(newElement)) ArrayOfWords.push(newElement);       //if element isn't a number add it to array
    });
    if (ArrayOfWords.length == 0) {
        console.log("There isn't any words:( Try again!");          //if user input has only numbers, send error message
        return;
    }
    ArrayOfWords.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());      //Function to sort all words alphabetically
    })
    let nonUnique = 0;
    for (let i = 0; i < ArrayOfWords.length;) {                     //Loop to find if after chosen element there are the same elements
        if ((i + nonUnique) < ArrayOfWords.length && ArrayOfWords[i] == ArrayOfWords[i + nonUnique + 1]) nonUnique++; //if yes we incriminate nonUnique by one
        else if (ArrayOfWords[i] != ArrayOfWords[i + nonUnique + 1] && nonUnique == 0) { console.log(ArrayOfWords[i]); i++ } //if no we send it to console
        else if (ArrayOfWords[i] != ArrayOfWords[i + nonUnique + 1] && nonUnique != 0) {
            i += nonUnique + 1; nonUnique = 0;
        }
    }
}

module.exports = UniqueWords;