let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const saveBtn = document.getElementById('saveBtn');
const lapsContainer = document.getElementById('laps');

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);
    return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
}

startBtn.addEventListener('click', () => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = timeToString(elapsedTime);
    }, 10);
});

stopBtn.addEventListener('click', () => clearInterval(timerInterval));

lapBtn.addEventListener('click', () => {
    if (elapsedTime > 0) {
        laps.push(timeToString(elapsedTime));
        const li = document.createElement('li');
        li.innerText = `Lap ${laps.length}: ${timeToString(elapsedTime)}`;
        lapsContainer.appendChild(li);
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    display.innerHTML = "00:00:00.00";
    elapsedTime = 0;
    laps = [];
    lapsContainer.innerHTML = '';
});

// PUSH DATA TO BACKEND
saveBtn.addEventListener('click', async () => {
    if (laps.length === 0 && elapsedTime === 0) return alert("Nothing to save!");
    
    const payload = {
        finalTime: timeToString(elapsedTime),
        laps: laps,
        timestamp: new Date()
    };

    try {
        const response = await fetch('/api/save-timer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const data = await response.json();
        alert(data.message);
    } catch (err) {
        console.error("Backend Error:", err);
        alert("Could not connect to backend server.");
    }
});