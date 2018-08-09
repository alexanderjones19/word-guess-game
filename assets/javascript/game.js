var game = {
    guessesRemaining: 12,
    lettersGuessed: [],
    wins: 0,
    currentWord: {},
    questionsAsked: [],
    wordBank: [
        {
            word: 'dracula',
            image: 'dracula.jpg'
        },
        {
            word: 'pennywise',
            image: 'pennywise.jpg'
        },
        {
            word: 'jason',
            image: 'jason.jpg'
        },
        {
            word: 'freddy',
            image: 'freddy.jpg'
        },
        {
            word: 'candyman',
            image: 'candyman.jpg'
        },
        {
            word: 'chucky',
            image: 'chucky.jpg'
        },
        {
            word: 'pinhead',
            image: 'pinhead.jpg'
        },
        {
            word: 'alien',
            image: 'alien.jpg'
        },
        {
            word: 'leatherface',
            image: 'leatherface.jpg'
        },
        {
            word: 'mummy',
            image: 'mummy.jpg'
        }
    ],
    disguisedWord: '',
    nextWord: function() {
        this.currentWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];
        var blankedWord = this.currentWord.word.replace(/[a-z]/gi, '_');
        this.displayWord(blankedWord);
        this.lettersGuessed = [];
        $('#letters-guessed').text(this.lettersGuessed.join(', '));
        this.guessesRemaining = 12;
        $('#guesses-remaining').text(this.guessesRemaining);
    },
    gameStarted: false,
    // guess function that takes input as a letter and checks if the current word includes that letter
    guess: function(letter) {
        if (this.lettersGuessed.includes(letter) === false) {
            this.lettersGuessed.push(letter);
            $('#letters-guessed').text(this.lettersGuessed.join(', '));
            if (this.currentWord.word.includes(letter)) {
                // the disguised words blanks are split into an array as single characters
                var splitUpBlanks = this.disguisedWord.split('');
                // loop through the current word and see if the character at the index is the same as the letter input
                for (i = 0; i < this.currentWord.word.length; i++) {
                    if (this.currentWord.word.charAt(i) === letter) {
                        // the index of the split up  blanks is then noted as the same as the letter input
                        splitUpBlanks[i] = letter;
                    }       
                }
                this.displayWord(splitUpBlanks.join(''));
            }
            // lowers the guesses remaining and changes text of element
            this.guessesRemaining --;
            $('#guesses-remaining').text(this.guessesRemaining);
            // checks if the word is completed and adds a win and updates win counter and resets word
            if (this.disguisedWord.includes('_') === false) {
                this.wins ++
                $('#win-counter').text(this.wins);
                $('.villain-picture').empty();
                $('.villain-picture').append('<img id="picture" src="assets/images/' + this.currentWord.image + '" />');
                $('#villain-name').empty();
                $('#villain-name').text(this.currentWord.word);
                this.nextWord();
                
                
                
            }
            // check for loss or next word
            if (this.guessesRemaining === 0) {
                this.nextWord();
            }
        }
    },
    // function takes an input and displays it as text in next-word id, then sets disguised word to what gets passed in
    displayWord: function(input) {
        $('#next-word').text(input);
        this.disguisedWord = input;
    }
}

$(document).ready(function() {
    $(document).keypress(function(event) {
        var keyPressed = String.fromCharCode(event.which)
    
        if (game.gameStarted) {
            if  (keyPressed.match(/[a-z]/gi)) { 
            game.guess(keyPressed.toLowerCase());
            }      
        }
        else {
            game.nextWord();
            game.gameStarted = true;
        }
        
    });
});