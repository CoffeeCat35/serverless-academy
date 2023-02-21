//Show unique words and numbers
function UniqueWordsAndNUmbers(Array) {
    let ArrayOfNumbersAndWords = [];                                //Create new array
    Array.forEach(newElement => {
        ArrayOfNumbersAndWords.push(newElement);
    });
    ArrayOfNumbersAndWords.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());      //Function to sort all words alphabetically
    })
    let nonUnique = 0;
    for (let i = 0; i < ArrayOfNumbersAndWords.length;) {           //Loop to find if after chosen element there are the same elements
        if ((i + nonUnique) < ArrayOfNumbersAndWords.length && ArrayOfNumbersAndWords[i] == ArrayOfNumbersAndWords[i + nonUnique + 1]) nonUnique++;         //if yes we incriminate nonUnique by one
        else if (ArrayOfNumbersAndWords[i] != ArrayOfNumbersAndWords[i + nonUnique + 1] && nonUnique == 0) { console.log(ArrayOfNumbersAndWords[i]); i++ }  //if no we send it to console
        else if (ArrayOfNumbersAndWords[i] != ArrayOfNumbersAndWords[i + nonUnique + 1] && nonUnique != 0) {
            i += nonUnique + 1; nonUnique = 0;
        }
    }
}

module.exports = UniqueWordsAndNUmbers;