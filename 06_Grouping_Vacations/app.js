const fs = require("fs");
const axios = require("axios");
const binarySearch = require("./binarySearch");

var ArrayOfUsers = [];

axios.get(`https://jsonbase.com/sls-team/vacations`).then(resp => {

    for (var i = 0; i < resp.data.length; i++) {
        var user = { userId: '', userName: '', vacations: [] }
        var vacation = { startDate: "", endDate: "" };
        var current = resp.data[i];

        if (ArrayHas(current.user.name)) { //if user is found in array, we just re-write him with new vacations
            var indexOfCurrentUserInArray = ArrayOfUsers.map(e => e.userName).indexOf(current.user.name);

            user.userId = ArrayOfUsers[indexOfCurrentUserInArray].userId;
            user.userName = ArrayOfUsers[indexOfCurrentUserInArray].userName;
            countOfVacation = ArrayOfUsers[indexOfCurrentUserInArray].vacations.length;
            for (var j = 0; j < countOfVacation; j++) {
                user.vacations.push(ArrayOfUsers[indexOfCurrentUserInArray].vacations[j])
            }

            vacation.startDate = current.startDate;
            vacation.endDate = current.endDate;
            user.vacations.push(vacation);

            ArrayOfUsers[indexOfCurrentUserInArray] = user;
        }
        else { //if user isn't found in array, we create new user and push him to our array
            user.userId = current.user._id;
            user.userName = current.user.name;
            vacation.startDate = current.startDate;
            vacation.endDate = current.endDate;
            user.vacations.push(vacation);

            ArrayOfUsers.push(user);
            ArrayOfUsers.sort(sortByName);
        }
    }

    console.log(ArrayOfUsers);

    fs.writeFile('database.json', JSON.stringify(ArrayOfUsers), (err) => {
        if (err) console.log('Error');
    })

    fs.writeFile('database.txt', JSON.stringify(ArrayOfUsers), (err) => {
        if (err) console.log('Error');
    })
});

function ArrayHas(User) {
    return binarySearch(ArrayOfUsers, 0, ArrayOfUsers.length - 1, User)
}

function sortByName(a, b) {
    return a.userName > b.userName ? 1 : -1;
}