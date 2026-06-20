const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware to read JSON incoming data strings
app.use(express.json());

// Expose public folder to client browser
app.use(express.static(path.join(__dirname, 'public')));

// API Endpoint to catch stopwatch logs
app.post('/api/save-timer', (req, res) => {
    const { finalTime, laps, timestamp } = req.body;
    
    console.log("=== New Stopwatch Log Received ===");
    console.log(`Time: ${finalTime}`);
    console.log(`Laps Count: ${laps.length}`);
    console.log(`Logged At: ${timestamp}`);
    
    // In a real database app, you would run a database query here.
    res.status(200).json({ message: "Successfully tracked session on the backend server!" });
});

app.listen(PORT, () => {
    console.log(`🚀 Backend active at http://localhost:${PORT}`);
});