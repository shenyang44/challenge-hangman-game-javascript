let enter = document.querySelector('header');
let characters;
let userInput = document.querySelector('input');
let guess;
let hearts = document.querySelectorAll('i')
let heartCount;
let list = document.querySelector('ul');
let count;
let words = ['paper', 'porcupine', 'polish', 'corn', 'cream', 'apple', 'amazon', 'electric', 'huge', 'handsome', 'creep', 'game', 'goose', 'lever', 'white', 'elephant', 'candles', 'shorts', 'computer', 'zebra', 'laptop', 'cucumber', 'telephone']
let myBlank = document.getElementById('myBlank');
let btmText = document.querySelector('footer');

// Upon keydown
enter.addEventListener('keydown', function (e) {
    //wins or losses exit the func.
    if (gameState() == 'winner') {
        return;
    }
    else if (gameState() == 'loser') {
        return;
    }
    //when the "enter" key is hit
    else if (e.code == "Enter") {
        guess = document.createElement('li')
        guess.innerHTML = userInput.value;
        userInput.value = '';
        list = document.querySelector('ul')
        count = 0;
        //accepts only a-z (lowercase)
        if (validChar()) {
            //checks if the guess has been made before.
            for (let i = 0; i < list.childNodes.length; i++) {
                if (guess.innerHTML == list.childNodes[i].innerHTML) {
                    count++
                }
            }
            //whether the guess fits into the word
            assessGuess();
            //updates and checks if user has lost or won.
            gameState();
        }
        else {
            alert('Enter only one character. (a-z)')
        }
    }
})


document.querySelector('button').addEventListener('click', () => newGame())

// Did not like the refresh feel, so did not use.
// restart = () => {
//     location.reload()
// }

newGame();
//initial set-up for game, also runs on "new game" button.
function newGame() {
    n = Math.floor(Math.random() * words.length)
    chosenWord = words[n];
    characters = chosenWord.split('');
    while (myBlank.hasChildNodes()) {
        myBlank.removeChild(myBlank.firstChild)
    }
    for (let j = 0; j < characters.length; j++) {
        blanks = document.createElement('div');
        blanks.classList.add('blank')
        blanks.innerHTML = ('_ ')
        myBlank.append(blanks)
    }
    for (let i = 0; i < hearts.length; i++) {
        if (hearts[i].style.color != 'red') {
            hearts[i].classList.add('alive');
        }
    }
    heartCount = hearts.length;
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    btmText.innerHTML = '';
}

function fillBlanks(char, index) {
    if (char == guess.innerHTML) {
        myBlank.childNodes[index].innerHTML = guess.innerHTML + ' ';
    }
}
function assessGuess() {
    if (count == 0) {
        list.append(guess)
        characters.forEach(check)
        if (count == characters.length) {
            liveHearts = document.getElementsByClassName('alive')
            liveHearts[0].classList.remove('alive')
            heartCount--
        }
        characters.forEach(fillBlanks)
    }
    else {
        alert('You have guessed that before!')
    }
}

function check(value) {
    if (value != guess.innerHTML) {
        count++;
    }
}

function validChar() {
    str = guess.innerHTML.split('');
    alphabets = new RegExp("^[a-z]+$");
    if (str.length == 1 && alphabets.test(str)) {
        return true
    }
    else {
        return false
    }
}

function gameState() {
    if (heartCount == 0) {
        btmText.innerHTML = `You died :'(`;
        return ('loser')
    }
    let filledCount = 0;

    for (let i = 0; i < myBlank.childElementCount; i++) {
        if (myBlank.childNodes[i].innerHTML != '_ ') {
            filledCount++
        }
    }
    if (filledCount == myBlank.childElementCount) {
        document.querySelector('footer').innerHTML = "Yay! You won!";
        return ('winner');
    }
}