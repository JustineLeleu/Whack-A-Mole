let startMenu = document.getElementById("start-menu");
let endMenu = document.getElementById("end-menu");
let startButton = document.getElementById("start-button");
let restartButton = document.getElementById("restart-button");
let finalScoreDisplay = document.getElementById("final-score");
let boardDisplay = document.getElementById("board");

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

// called for starting the game
function startGame()
{
    startMenu.style.visibility = "hidden";
    audioStart.play();
    animCamera();
    audioGame.play();

    molesObj.forEach(element => {
        moles.push(new Mole(element));
    });

    window.addEventListener("click", onClickWindow);
    isPlaying = true;
    initTime = Date.now()
    gameTimer();
    playTimer = setInterval(gameTimer, 1000);
    setTimeout(showMole, 1000);
}

// called when end game and show menu
function endGame()
{
    endMenu.style.visibility = "visible";
    isPlaying = false;
    finalScoreDisplay.textContent = `: ${score}`;
    audioGame.pause();
    audioGame.currentTime = 0;
    audioEnd.play();
    audioMenu.play();
}

// called for restarting the game
function restartGame()
{
    endMenu.style.visibility = "hidden";
    audioMenu.pause();
    audioMenu.currentTime = 0;
    audioStart.play();
    audioGame.play();

    initTime = Date.now()
    gameTimer();
    playTimer = setInterval(gameTimer, 1000);
    setTimeout(showMole, 1000);
    isPlaying = true;
}

function animCamera()
{
    let rotX = 0.01;
    let rotY = 0.01;
    let posX = 0.02;
    let posY = 0.015;
    let posZ = 0.02;

    cameraTimer = setInterval(() => {
        camera.position.z -= posZ;
        camera.position.y -= posY;
        camera.position.x -= posX;
        camera.rotation.x -= rotX;
        camera.rotation.y -= rotY;
        console.log("rotate");

        if (camera.rotation.x <= -0.9) rotX = 0;
        if (camera.rotation.y <= 0) rotY = 0;
        if (camera.position.x <= 0) posX = 0;
        if (camera.position.y <= 0.8) posY = 0;
        if (camera.position.z <= 0.63) posZ = 0;

        if (rotX == 0 && rotY == 0 && posX == 0 && posY == 0 && posZ == 0)
        {
            clearInterval(cameraTimer);
            boardDisplay.style.visibility = "visible";
        }
    }, 10);
}