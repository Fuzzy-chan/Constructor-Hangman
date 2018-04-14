var Word = require('./Word');
var inquirer = require('inquirer');
var isLetter = require('is-letter');

var boardGames = ['Board Game', 'arkham horror', 'seven wonders', 'legendary'];

var videoGames = ['Video Game', 'the binding of isaac', 'final fantasy', 'skyrim'];

var chosenCategory = [];
var word;
var guessedLetters = [];
var chosenWord;
var guesses = 10;

var getCategory = function chooseCatagory() {
    // gets random category
    var random = Math.random()
    if (random >= .5) {
        chosenCategory = chosenCategory.concat(boardGames)
        return chosenCategory;
    } else {
        chosenCategory = chosenCategory.concat(videoGames)
        return chosenCategory;
    }
}

var getWord = function chooseWord(array) {
    // choose a random word starting from spot 1 in array, first position will be used as a hint and not as a word to guess and transforms it into an array of letters
    word = array[Math.floor(Math.random() * array.length) + 1]
    return word;
}
var promptForLetter = function () {
    if (guesses > 0) {
        inquirer.prompt([{
            name: "ltr",
            type: "input",
            message: "Choose a letter:",
            validate: function (value) {
                if (isLetter(value)) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function (response) {

            if (!guessedLetters.includes(response.ltr)) {
                guessedLetters.push(response.ltr)
                chosenWord.userGuess(response.ltr)
                console.log(chosenCategory[0])
                console.log(chosenWord.printWord())
                if (!chosenWord.printWord().includes('_')) {
                    return console.log('Hey, you won! Good Job!')
                } else {
                    if (chosenWord.printWord().includes(response.ltr)) {
                        console.log('You still have ' + guesses + ' guesses left.')
                        promptForLetter()
                    } else {
                        guesses--
                        console.log('You only have ' + guesses + ' guesses left!')
                        promptForLetter()
                    }
                }

            } else {
                console.log('You have already guessed that!')
                promptForLetter()
            }

        })
    } else {

        console.log("Hey, you'll get it next time. Thanks for playing!")

    }
}




inquirer.prompt([{
    name: "play",
    type: "confirm",
    message: "Ready to play?"
}]).then(function (answer) {
    if (answer.play) {
        getCategory();
        chosenWord = new Word(getWord(chosenCategory))
        guesses = 10;
        console.log(chosenCategory[0])
        console.log(chosenWord.printWord())
        console.log('You have ' + guesses + ' guesses. Have fun!')
        promptForLetter()


    } else {
        console.log("Fine, I didn't want to play anyway...");
    }
})
