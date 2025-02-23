export const GetSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   
    let recognition = new SpeechRecognition();
    recognition.continuous = true; // Keep listening even after pauses
    recognition.interimResults = false; // Only finalize when speech is done
    recognition.maxAlternatives = 1; // Reduce multiple results for clarity

    let lastTranscript = ""; // Store last detected speech to avoid duplicates
    let timeoutId = null; // Timeout to extend silence duration

    recognition.onstart = () => {
        console.log("Starting listening, and say 'I'm done' when you want to stop ");
    };

    recognition.onresult = (event) => {
        let transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();

        if (transcript !== lastTranscript) { // Avoid repeated logs for the same sentence
            console.log("You said:", transcript);
            lastTranscript = transcript;

            if (transcript.includes("done")) {
                console.log("Stopping recognition...");
                recognition.stop();
                return;
            }

            // Reset the timeout when the user is still speaking
            if (timeoutId) clearTimeout(timeoutId);

            // Extend silence duration (Wait 3 seconds before considering speech finished)
            timeoutId = setTimeout(() => {
                console.log("Silence detected, resetting...");
                lastTranscript = ""; // Reset transcript tracking
            }, 3000); // Extend silence duration (adjustable)
        }
    };

    recognition.onspeechend = () => {
        console.log("Silence detected, waiting for more speech...");
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };

    recognition.start();
};
