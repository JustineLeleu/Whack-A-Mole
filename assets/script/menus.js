let startMenu = document.getElementById("start-menu");
let endMenu = document.getElementById("end-menu");
let startButton = document.getElementById("start-button");
let restartButton = document.getElementById("restart-button");
let finalScoreDisplay = document.getElementById("final-score");

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

// called for starting the game
function startGame()
{
    startMenu.style.visibility = "hidden";

    molesObj.forEach(element => {
        moles.push(new Mole(element));
    });

    window.addEventListener("click", onClickWindow);
    initTime = Date.now()
    gameTimer();
    playTimer = setInterval(gameTimer, 1000);
    setTimeout(showMole, 1000);
}

// called when end game and show menu
function endGame()
{
    endMenu.style.visibility = "visible";
    finalScoreDisplay.textContent = `: ${score}`;
}

// called for restarting the game
function restartGame()
{
    endMenu.style.visibility = "hidden";

    initTime = Date.now()
    gameTimer();
    playTimer = setInterval(gameTimer, 1000);
    setTimeout(showMole, 1000);
}