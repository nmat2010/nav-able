export const AutoTyping = (wordsElement) => {
    var speech = true;
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true; // 

    // Ensure there is an element with class 'words'
    const words = document.querySelector('.words');
    if (!words) {
        console.error("Element with class 'words' not found.");
        return;
    }

    // Create and append <p> element
    const p = document.createElement('p');
    words.appendChild(p);

    recognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        p.textContent = transcript; // Update the paragraph with transcribed text
        console.log(transcript);
        
        if (transcript.includes("done")) {
                console.log("Stopping recognition...");
                recognition.stop();
                return;
            }
    });

    if (speech === true) {
        recognition.start();
        recognition.addEventListener('end', recognition.start);
    }
};
