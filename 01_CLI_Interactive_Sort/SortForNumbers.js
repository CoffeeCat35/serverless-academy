//Sort numbers
function SortForNumbers(Array, chooseVariation) {
    var ArrayOfNumbers = [];                                        //Create new array for numbers
    Array.forEach(newElement => {
        if (!isNaN(newElement)) ArrayOfNumbers.push(newElement);    //if element is a number add it to array
    });
    if (ArrayOfNumbers.length == 0) {
        console.log("There isn't any number:( Try again!");         //if user input has no numbers, send error message
        return;
    }
    ArrayOfNumbers.sort(function (a, b) {
        return a * chooseVariation - b * chooseVariation;           //Function sort that use argument how to sort
    })

    ArrayOfNumbers.forEach(element => {
        console.log(element);
    });
}

module.exports = SortForNumbers;