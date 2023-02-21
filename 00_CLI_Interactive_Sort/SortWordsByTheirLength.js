//Display words in ascending order by number of letters in the word
function SortWordsByTheirLength(Array) {
    let ArrayOfNumbers = [];                                        //Create new array for words
    Array.forEach(newElement => {
        if (isNaN(newElement)) ArrayOfNumbers.push(newElement);     //if element isn't a number add it to array
    });
    if (ArrayOfNumbers.length == 0) {
        console.log("There isn't any words:( Try again!");          //if user input has only numbers, send error message
        return;
    }
    ArrayOfNumbers.sort(function (a, b) {
        return a.length - b.length;                                 //Function to sort all words in ascending order
    })

    ArrayOfNumbers.forEach(element => {
        console.log(element);
    });
}
module.exports = SortWordsByTheirLength;