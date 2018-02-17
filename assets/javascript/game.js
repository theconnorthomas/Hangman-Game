var phrases = ['echo tango alfa', 'oscar mike', 'whiskey tango foxtrot', 'lima charlie', 'wilco', 'lima oscar alfa', 'alfa', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliett', 'kilo', 'lima', 'mike', 'november', 'oscar', 'papa', 'quebec', 'romeo', 'sierra', 'tango', 'uniform', 'victor', 'whiskey', 'xray', 'yankee', 'zulu'];

var allGuesses = [];

var incorrectGuesses = [];

var underscores = [];

var lives = 11;

var wins = 0;

var losses = 0;

var currentPhrase = [chosePhrase()];

function generateIndex(index) {

    return Math.floor(Math.random() * index);

}

function chosePhrase() {

    return phrases[generateIndex(phrases.length)]

}

function inputs() {

    for (i = 0; i < currentPhrase[0].length; i++) {
        if (currentPhrase[0][i] === ' ') {
            underscores.push(' ');
        }
        else {
            underscores.push('_');
        }
    };

}

function initialize() {

    inputs();

    correctGuess();

    incorrectGuess();

    document.getElementById('wins').innerHTML = 'Missiles Deactivated: ' + wins;

    document.getElementById('losses').innerHTML = 'Failed Logins: ' + losses;

}

function correctGuess() {

    document.getElementById('inputs').innerHTML = underscores.join('');

}

function winner() {

    wins++;

    document.getElementById('wins').innerHTML = 'Missiles Deactivated: ' + wins;

    document.getElementById('sitRep').innerHTML = 'PASSWORD CORRECT, MISSILE SYSTEM DEACTIVATED!';

}

function incorrectGuess() {

    lives--;

    document.getElementById('lives').innerHTML = 'Incorrect inputs remaining before failure: ' + lives;

    document.getElementById('allGuesses').innerHTML = 'Incorrect inputs: ' + incorrectGuesses;

}

function loser() {

    losses++;

    document.getElementById('losses').innerHTML = 'Failed Logins: ' + losses;

    document.getElementById('sitRep').innerHTML = 'INVALID PASSWORD, TRY AGAIN!';

}

function reinitialize() {

    underscores = [];
    
    allGuesses = [];
    
    incorrectGuesses = [];
    
    lives = 11;
    
    currentPhrase.splice(0, 1, chosePhrase());

    inputs();
    
    correctGuess();
    
    incorrectGuess();

    document.getElementById('allGuesses').innerHTML = incorrectGuesses;

}

initialize();

document.onkeyup = function(e) {

    var guess = e.key.toLowerCase();

    for (i = 0; i < allGuesses.length; i++) {
        if (guess === allGuesses[i]) {
            return;
        };
    };

    if (currentPhrase[0].toLowerCase().indexOf(guess) > -1) {

        allGuesses.push(guess);


        for (i = 0; i < currentPhrase[0].length; i++) {

            if (guess === currentPhrase[0][i].toLowerCase()) {
                underscores.splice(i, 1, guess);
            };

            correctGuess();
        };

    }

    else {

        allGuesses.push(guess);
        
        incorrectGuesses.push(guess);

        incorrectGuess();

    };

    if (underscores.join('') === currentPhrase[0].toLowerCase()) {

        winner();

        reinitialize();
    }

    if (lives < 1) {

        loser();

        reinitialize();
    };
};

