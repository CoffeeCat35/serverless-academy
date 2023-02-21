//Sort words alphabetically
function SortForWords(Array) {
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

    ArrayOfWords.forEach(element => {
        console.log(element);
    });
}

module.exports = SortForWords;