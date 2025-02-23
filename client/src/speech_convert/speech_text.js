export const GetSpeech = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
   
    let recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;


    let lastTranscript = "";
    let timeoutId = null;


    // Smooth scroll variables
    let scrollInterval = null;
    let scrollSpeed = 10;
    let isScrolling = false;


    //Texting
    let isTypingMode = false;


    recognition.onstart = () => {
        console.log("Listening... Say commands like 'scroll up', 'scroll down', or 'open search bar'.");
    };


    recognition.onresult = (event) => {
        let transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();


        if (transcript !== lastTranscript) {
            console.log("You said:", transcript);
            lastTranscript = transcript;
            handleVoiceCommand(transcript);


            if (transcript.includes("done")) {
                console.log("Stopping recognition...");
                recognition.stop();
                return;
            }
        }






        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            console.log("Silence detected, resetting...");
            lastTranscript = "";
        }, 3000);
    };


    recognition.onspeechend = () => {
        console.log("Silence detected, waiting for more speech...");
    };


    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };


    recognition.start();


    function handleVoiceCommand(command) {
        //Scroll Down/Up
        if (command.includes("scroll down")) {
            startSmoothScroll(1);
        } else if (command.includes("scroll up")) {
            startSmoothScroll(-1);
        } else if (command.includes("stop scrolling")) {
            stopSmoothScroll();
        }
       
        //Open Search Bar (Not working now)
        else if (command.includes("open search bar")) {
            let searchInput = document.querySelector("input[type='search']");
            if (searchInput) {
                searchInput.focus();
            }
        }
       
        //Reloading page
        else if (command.includes("reload page")) {
            location.reload();
        }
       
        //Go to top/bot
        else if (command.includes("go to top")) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (command.includes("go to bottom")) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        }
       
        //Typing
        else if(command.includes("typing")){
            isTypingMode = true;
            console.log("Typing mode activated. Start speaking...");
        } else if (command.includes("stop saying")){
            isTypingMode = false;
            console.log("Typing mode stopped");
        } else if (isTypingMode){
            insertTextAtCursor(command);
        }
       
        //Clicking
        else if (command.includes("clicking")){
            simulateMouseClick();
        }
    }




   
   
   
   
    // Direction Scrolling
    function startSmoothScroll(direction) {
        if (isScrolling) return;
        isScrolling = true;


        scrollInterval = setInterval(() => {
            window.scrollBy({ top: direction * scrollSpeed, behavior: "smooth" });
        }, 30);
    }

    function stopSmoothScroll() {
        if (!isScrolling) return;
        clearInterval(scrollInterval);
        isScrolling = false;
    }


    // Insert the text at cursor position
    function insertTextAtCursor(text) {
        const activeElement = document.activeElement;
        if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA" || activeElement.isContentEditable)) {
            const start = activeElement.selectionStart;
            const end = activeElement.selectionEnd;
            const value = activeElement.value || activeElement.innerText;


            const newValue = value.substring(0, start) + text + value.substring(end);
            if (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA") {
                activeElement.value = newValue;
                activeElement.selectionStart = activeElement.selectionEnd = start + text.length;
            } else {
                activeElement.innerText = newValue;
            }


            console.log(`Typed: "${text}"`);
        } else {
            console.warn("No text field or editable area is focused.");
        }
    }


    //Clicking like Right_Mouse
    function simulateMouseClick() {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;


        const element = document.elementFromPoint(x,y);
        if(element){
            element.click();
        }
    }
};





