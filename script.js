let startTime;
let updatedTime;
let running = false;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - elapsedTime;
        timerInterval = setInterval(updateTime, 10); // Update every 10ms
        startStopButton.textContent = 'Pause';
    } else {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Resume';
    }
    running = !running;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    display.textContent = '0:00:00';
    startStopButton.textContent = 'Start';
    lapsContainer.innerHTML = ''; // Clear the laps when reset
}

function updateTime() {
    updatedTime = new Date().getTime();
    elapsedTime = updatedTime - startTime;
    
    const milliseconds = Math.floor((elapsedTime % 1000) / 10); // Get milliseconds
    const seconds = Math.floor((elapsedTime / 1000) % 60); // Get seconds
    const minutes = Math.floor((elapsedTime / 1000 / 60) % 60); // Get minutes

    // Display the time with minutes:seconds:milliseconds format
    const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}:${milliseconds < 10 ? '0' : ''}${milliseconds}`;
    display.textContent = formattedTime;
}

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        const lapDiv = document.createElement('div');
        lapDiv.textContent = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapDiv);
    }
}

startStopButton.addEventListener('click', startStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', recordLap);
