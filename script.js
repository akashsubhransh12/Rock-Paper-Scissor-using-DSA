document.addEventListener("DOMContentLoaded", () => {
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
    
    let userScore = 0;
    let computerScore = 0;
    let gameHistory = []; // To store the history of the games
    
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        if (username) {
            displayUsername.textContent = username;
            registerSection.style.display = "none";
            gameSection.style.display = "block"; // Ensure game section becomes visible
        }
    });
    
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
    
    playAgainButton.addEventListener("click", () => {
        userChoiceDisplay.textContent = "Your choice: ";
        computerChoiceDisplay.textContent = "Computer's choice: ";
        winnerDisplay.textContent = "Winner: ";
    });
    
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

    function updateScore(winner) {
        if (winner === "You win!") {
            userScore++;
        } else if (winner === "Computer wins!") {
            computerScore++;
        }
        scoreDisplay.textContent = `User: ${userScore} - Computer: ${computerScore}`;
    }
    
    function updateHistory(userChoice, computerChoice, winner) {
        const gameTime = new Date().toLocaleString();
        gameHistory.push({ userChoice, computerChoice, winner, gameTime });
        let historyHTML = "";
        gameHistory.forEach((game, index) => {
            historyHTML += `<li>Game ${index + 1}: You chose ${game.userChoice}, Computer chose ${game.computerChoice} - ${game.winner} (Played at: ${game.gameTime})</li>`;
        });
        historyDisplay.innerHTML = historyHTML;
    }

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
});
