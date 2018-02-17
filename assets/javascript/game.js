var phrases = ['echo tango alfa', 'oscar mike', 'whiskey tango foxtrot', 'lima charlie', 'wilco', 'lima oscar alfa', 'alfa', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel', 'india', 'juliett', 'kilo', 'lima', 'mike', 'november', 'oscar', 'papa', 'quebec', 'romeo', 'sierra', 'tango', 'uniform', 'victor', 'whiskey', 'xray', 'yankee', 'zulu'];

var allGuesses = [];

var wrongGuesses = [];

var underscores = [];

var lives = 10;

var wins = 0;

var losses = 0;

var currentPhrase = [chosePhrase()];


function generateIndex(i) {
    return Math.floor(Math.random() * i);
}

function chosePhrase() {
    return phrases[generateIndex(phrases.length)]
}


function spaces() {
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
    document.getElementById('spaces').innerHTML = underscores.join('');

    document.getElementById('allGuesses').innerHTML = wrongGuesses;

    document.getElementById('lives').innerHTML = 'Incorrect inputs remaining before failure: ' + lives;

    document.getElementById('wins').innerHTML = 'Missiles Deactivated: ' + wins;

    document.getElementById('losses').innerHTML = 'Failed Logins: ' + losses;





};

function guessCorrect() {

    document.getElementById('spaces').innerHTML = underscores.join('');

};

function guessIncorrect() {

    lives--;

    document.getElementById('lives').innerHTML = 'Incorrect inputs remaining before failure: ' + lives;

    document.getElementById('allGuesses').innerHTML = 'Incorrect inputs: ' + wrongGuesses;

}

function gameWon() {

    wins++;

    document.getElementById('wins').innerHTML = 'Missiles Deactivated: ' + wins;

    document.getElementById('status').innerHTML = 'PASSPHRASE CORRECT, MISSILE SYSTEM DEACTIVATED';

};

function gameLost() {


    losses++;

    document.getElementById('losses').innerHTML = 'Failed Logins: ' + losses;


    document.getElementById('status').innerHTML = 'INVALID INPUT, TRY AGAIN' + gameLost;

};


function reinitialize() {


    underscores = [];

    currentPhrase.splice(0, 1, chosePhrase());

    spaces();
    document.getElementById('spaces').innerHTML = underscores.join('');

    lives = 10;
    document.getElementById('lives').innerHTML = 'Incorrect inputs remaining before failure: ' + lives;

    wrongGuesses = [];

    document.getElementById('allGuesses').innerHTML = wrongGuesses;

    allGuesses = [];

};


spaces();
initialize();

document.onkeyup = function (e) {

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

            guessCorrect();

        };

    }

    else {

        wrongGuesses.push(guess);

        allGuesses.push(guess);

        guessIncorrect();

    };

    if (underscores.join('') === currentPhrase[0].toLowerCase()) {

        gameWon();

        reinitialize();
    }

    if (lives <= 0) {

        gameLost();

        reinitialize();
    };
};

