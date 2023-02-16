function binarySearch(arr, startIndex, arrLenght, value) {
    if (arrLenght >= startIndex) {
        let mid = startIndex + Math.floor((arrLenght - startIndex) / 2);

        // If the element is present at the middle
        // itself
        if (arr[mid] == value)
            return true;

        // If element is smaller than mid, then
        // it can only be present in left subarray
        if (arr[mid] > value)
            return binarySearch(arr, startIndex, mid - 1, value);

        // Else the element can only be present
        // in right subarray
        return binarySearch(arr, mid + 1, arrLenght, value);
    }

    // We reach here when element is not
    // present in array
    return false;
}

module.exports = binarySearch;