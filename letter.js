var Letter = function (string) {

    this.letter = string,
    this.guessed = false,
    this.showLetter = function () {
            if (this.letter == ' ') {
                this.guess = true;
                return ' ';
            } else if (this.guessed) {
                return this.letter;
            } else {
                return '_';
            }
        };
    this.check = function (guess) {
        if (this.letter == guess) {
            this.guessed = true;
        }
    };

};

module.exports = Letter;