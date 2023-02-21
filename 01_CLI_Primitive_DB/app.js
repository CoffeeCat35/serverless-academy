const inquirer = require('inquirer');

const fs = require('fs');

let person = {      //obj to save data that user will write
    User: '',
    Age: '',
    Gender: ''
};

function recursionAnswer() {
    let repeatApp = 0;   //variable ot repeat questions
    const askQuestion = () => {
        inquirer
            .prompt([
                /* Pass your questions in here */
                {
                    type: 'input',
                    name: 'User',
                    message: 'Enter the user\`s name. To cancel press ENTER: ',
                    validate: (answers) => {
                        if (answers == '') {        //if user pressed ENTER program will end with questions
                            //function name
                            repeatApp = 999;
                        }
                        return true;                //if user wrote his Name the program will continue to ask question
                    }
                }
            ])
            .then((answers) => {
                // As long as less than 1000 wrong answers, ask the question again
                person.User = answers.User;
                repeatApp++;
                if (repeatApp < 1000) {
                    // Ask the next question
                    inquirer
                        .prompt([
                            /* Pass your questions in here */
                            {
                                type: 'list',
                                message: 'Choose your Gender:',
                                name: 'Gender',
                                choices: ['male', 'female']
                            },
                            {
                                type: 'input',
                                message: 'Enter your age: ',
                                name: 'Age',
                            },
                        ])
                        .then((answers) => {
                            person.Gender = answers.Gender;        //save all data
                            person.Age = answers.Age;
                            AddToFile(person);                  //add all data to file
                            // Use user feedback for... whatever!!
                            askQuestion();
                        })
                        .catch((error) => {
                            if (error.isTtyError) {
                                // Prompt couldn't be rendered in the current environment
                            } else {
                                // Something else went wrong
                            }
                        });
                }
                else {
                    inquirer
                        .prompt([
                            /* Pass your questions in here */
                            {
                                type: 'confirm',
                                message: 'Would you like to search value in DB? ',
                                name: 'Confirm',
                            }
                        ])
                        .then((answers) => {
                            // Use user feedback for... whatever!!
                            if (!answers.Confirm) return;
                            else {
                                ReadFromFile();
                            }
                        })
                        .catch((error) => {
                            if (error.isTtyError) {
                                // Prompt couldn't be rendered in the current environment
                            } else {
                                // Something else went wrong
                            }
                        });
                }
            })
            .catch((error) => {
                if (error.isTtyError) {
                    // Prompt couldn't be rendered in the current environment
                } else {
                    // Something else went wrong
                }
            });
    }
    askQuestion();
}
recursionAnswer();

function AddToFile(person) {
    fs.readFile('database.txt', 'utf-8', (err, people) => {
        if (err) {
            fs.writeFile('database.txt', JSON.stringify(person), (err) => {
                if (err) console.log('Error');
            });
        }
        else if (people === '') {//if file has not data, put new from file's start
            fs.appendFile('database.txt', JSON.stringify(person), (err) => {
                if (err) console.log('Error');
            })
        }
        else {//if file has some data, put new from new line
            fs.appendFile('database.txt', '\n' + JSON.stringify(person), (err) => {
                if (err) console.log('Error');
            })
        }
    })
}

function ReadFromFile() {
    fs.readFile('database.txt', 'utf-8', (err, data) => {
        if (err) console.log('There is no data in database');
        else {
            people = data.toString();  //parse data from file to string
            people = people.split('\n'); //split all data by enter
            Search() //call the function to search the user by name
        }
    })
}

function Search() {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                type: 'input',
                message: 'Write user\`s name wanna find in DB: ',
                name: 'UserNameToFind',
            }
        ])
        .then((answers) => {
            let personName;
            let countNames = 0; //variable for if there is more than one found users
            for (let i = 0; i < people.length; i++) {
                personName = ParseName(people[i]); //call function ParseName to take users name from all data
                if (answers.UserNameToFind.toLowerCase() === personName[1].toLowerCase()) {
                    if (countNames == 0) console.log("User " + answers.UserNameToFind + " was found");
                    console.log(people[i]);
                    countNames++;
                }
                else {
                    if (countNames == 0 && i + 1 == people.length)
                        console.log("User " + answers.UserNameToFind + " wasn't found");
                }
            }
            return;
        })
}

function ParseName(person) {
    personName = person.split(',');
    personName = personName[0].split(':');
    personName = personName[1].split('"');
    return personName;
}