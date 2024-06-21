# Rock-Paper-Scissor-using-DSA
This is a simple game for a rock paper scissor using dsa in this you will play the game with computer.
You can use this project as a mini project in your starting semester 
For this you need have a any normal code editor
Create a folder on your Desktop
Open that folder in your code Editor(VS CODE) 
Create file for HTML,CSS, AND JAVASCRIPT
You can also import the whole file from my git reposity and paste it using git clone and the paste the repositry link over there 
At the end your simple gameing project is ready
Here is full explaination of javascript code where i have used dsa apprcoch to solve this game.


### General Overview

This code sets up a simple Rock-Paper-Scissors game. It allows a user to register with a username, play against the computer, track their score, and view their game history and statistics.

### Event: DOM Content Loaded

```javascript
document.addEventListener("DOMContentLoaded", () => {
```

The `DOMContentLoaded` event ensures that the JavaScript runs only after the HTML has fully loaded.

### Variables and Constants

The following lines retrieve HTML elements and store them in variables for later use:

```javascript
const registerForm = document.getElementById("register-form");
const registerSection = document.getElementById("register-section");
const gameSection = document.getElementById("game-section");
const displayUsername = document.getElementById("display-username");
const usernameInput = document.getElementById("username");
const choices = document.querySelectorAll(".choice img");
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const winnerDisplay = document.getElementById("winner");
const playAgainButton = document.getElementById("play-again");
const scoreDisplay = document.getElementById("score");
const historyDisplay = document.getElementById("history");
const statsDisplay = document.getElementById("stats");
const choicesArray = ["rock", "paper", "scissors"];
```

### State Variables

These variables keep track of the user and computer scores and the game history:

```javascript
let userScore = 0;
let computerScore = 0;
let gameHistory = []; // To store the history of the games
```

### User Registration

This section handles the user registration form submission:

```javascript
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
        displayUsername.textContent = username;
        registerSection.style.display = "none";
        gameSection.style.display = "block"; // Ensure game section becomes visible
    }
});
```

- `e.preventDefault()`: Prevents the form from submitting and reloading the page.
- The username is trimmed and checked. If it's not empty, it displays the username and switches the view from the registration section to the game section.

### Game Choices

This section adds event listeners to the game choices (rock, paper, scissors):

```javascript
choices.forEach(choice => {
    choice.addEventListener("click", (e) => {
        const userChoice = e.target.alt.toLowerCase();
        const computerChoice = choicesArray[Math.floor(Math.random() * 3)];
        const winner = determineWinner(userChoice, computerChoice);
        
        updateScore(winner);
        updateHistory(userChoice, computerChoice, winner);
        updateStats();
        
        userChoiceDisplay.textContent = `Your choice: ${userChoice}`;
        computerChoiceDisplay.textContent = `Computer's choice: ${computerChoice}`;
        winnerDisplay.textContent = `Winner: ${winner}`;
    });
});
```

- When a choice is clicked, it gets the user's choice from the `alt` attribute of the image.
- The computer's choice is randomly selected from the `choicesArray`.
- The `determineWinner` function determines the winner.
- The score, history, and stats are updated.
- The user's and computer's choices, as well as the winner, are displayed.

### Play Again Button

This resets the displayed choices and winner:

```javascript
playAgainButton.addEventListener("click", () => {
    userChoiceDisplay.textContent = "Your choice: ";
    computerChoiceDisplay.textContent = "Computer's choice: ";
    winnerDisplay.textContent = "Winner: ";
});
```

### Determine Winner Function

This function determines the winner based on the game rules:

```javascript
function determineWinner(user, computer) {
    if (user === computer) {
        return "It's a tie!";
    } else if (
        (user === "rock" && computer === "scissors") ||
        (user === "scissors" && computer === "paper") ||
        (user === "paper" && computer === "rock")
    ) {
        return "You win!";
    } else {
        return "Computer wins!";
    }
}
```

### Update Score Function

This function updates the scores based on the winner:

```javascript
function updateScore(winner) {
    if (winner === "You win!") {
        userScore++;
    } else if (winner === "Computer wins!") {
        computerScore++;
    }
    scoreDisplay.textContent = `User: ${userScore} - Computer: ${computerScore}`;
}
```

### Update History Function

This function updates the game history:

```javascript
function updateHistory(userChoice, computerChoice, winner) {
    const gameTime = new Date().toLocaleString();
    gameHistory.push({ userChoice, computerChoice, winner, gameTime });
    let historyHTML = "";
    gameHistory.forEach((game, index) => {
        historyHTML += `<li>Game ${index + 1}: You chose ${game.userChoice}, Computer chose ${game.computerChoice} - ${game.winner} (Played at: ${game.gameTime})</li>`;
    });
    historyDisplay.innerHTML = historyHTML;
}
```

### Update Stats Function

This function updates the statistics:

```javascript
function updateStats() {
    const totalGames = gameHistory.length;
    const userWins = gameHistory.filter(game => game.winner === "You win!").length;
    const computerWins = gameHistory.filter(game => game.winner === "Computer wins!").length;
    const ties = totalGames - userWins - computerWins;
    
    const userWinRate = ((userWins / totalGames) * 100).toFixed(2);
    const computerWinRate = ((computerWins / totalGames) * 100).toFixed(2);
    const tieRate = ((ties / totalGames) * 100).toFixed(2);

    statsDisplay.innerHTML = `
        <p>Total Games: ${totalGames}</p>
        <p>User Win Rate: ${userWinRate}%</p>
        <p>Computer Win Rate: ${computerWinRate}%</p>
        <p>Tie Rate: ${tieRate}%</p>
    `;
}
```

### Summary

1. **Registration**: User registers with a name, which triggers the display of the game section.
2. **Gameplay**: User selects rock, paper, or scissors. The computer randomly selects one too. The winner is determined and displayed.
3. **Score and History**: Scores, game history, and statistics are updated and displayed after each game.
4. **Play Again**: Allows the user to reset the displayed choices and winner for a new game.

This code integrates all functionalities required for a basic Rock-Paper-Scissors game, including registration, gameplay, score tracking, game history, and statistics display.
