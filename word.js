var Letter = require('./letter');

var Word = function (word) {
    for (var i = 0; i < word.length; i++) {
        this[i] = new Letter(word[i])
    }

    this.printWord = function () {
        var lettersArray = [];
        for (letter in this) {
            if (this[letter].showLetter) {
                lettersArray.push(this[letter].showLetter())
            }
        }
        return lettersArray.join(' ')
    }
    this.userGuess = function (string) {
        for (letter in this) {
           
            if (this[letter].check)
            this[letter].check(string);
        }
    }
}

module.exports = Word;
