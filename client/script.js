// window.saveDataAcrossSessions = true

// webgazer.setGazeListener((data, timestamp) => {
//     console.log(data.timestamp)
// }).begin()


window.onload = async function () {
    await webgazer.setRegression('ridge') // ML model for tracking
                 .setTracker('clmtrackr') // Face tracker
                 .begin(); // Start tracking

    webgazer.showPredictionPoints(true); // Show gaze dots
};

