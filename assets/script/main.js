let isPlaying = false;
let timeDisplay = document.getElementById("time");
let scoreDisplay = document.getElementById("score");
let initTime;
let inGameTime = 120;
let playTimer;
let showMolesTimer;
let moles = [];
let molesOut = [];
let score = 0;
let audioMenu = new Audio('assets/sounds/game-music-loop.mp3');
audioMenu.loop = true;
audioMenu.autoplay = true;
let audioGame = new Audio('assets/sounds/8bit-music.mp3');
audioGame.loop = true;
let audioStart = new Audio('assets/sounds/game-start.mp3');
let audioEnd = new Audio('assets/sounds/game-over.mp3');
let audioPunch = new Audio('assets/sounds/shooting-sound.mp3');
let audioScore = new Audio('assets/sounds/score.mp3');

// called when game start and count down untill the game is over
function gameTimer()
{
    let countDown = inGameTime - Math.floor(Number((Date.now() - initTime)/1000));

    let minutes = Math.floor((countDown % (60 * 60)) / 60);
    let seconds = Math.floor((countDown % 60));

    let time = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`

    timeDisplay.textContent = time;

    if (countDown == 0)
    {
        clearInterval(playTimer);
        clearTimeout(showMolesTimer);
        endGame();
        resetGame();
    }
}

// called first at game beginning and repeat itself for telling moles to appear
function showMole()
{
    let waitingTime = (Math.floor(Math.random() * 5) + 1) * 1000;
    let x;

    do 
    {
        x = Math.floor(Math.random() * 9);
    } while (molesOut.includes(moles[x]));

    molesOut.push(moles[x]);
    moles[x].appear();

    showMolesTimer = setTimeout(() => {
        showMole();
    }, waitingTime);
}

// click event set and call the raycast for moles
function onClickWindow(event)
{
    if(isPlaying)
    {
        audioPunch.play();

        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( pointer, camera );
        
        moles.forEach(element => {
            element.raycast();
        });
    }
}

// reset game at the end
function resetGame()
{
    moles.forEach(element => {
        element.mesh.position.y = -0.2;
        element.isOut = false;
        clearInterval(element.upTimer);
        clearTimeout(element.waitTimer);
        clearInterval(element.downTimer);
    });
    molesOut = [];
    scoreDisplay.textContent = "0";
    timeDisplay.textContent = "00:00";
    score = 0;
}