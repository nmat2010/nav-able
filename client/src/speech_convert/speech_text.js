import { useState, useEffect, useRef } from 'react';

export const GetSpeech = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  // Using refs to persist values across re-renders
  const scrollIntervalRef = useRef(null);
  const isScrollingRef = useRef(false);
  
  let recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let lastTranscript = "";
  let timeoutId = null;

  let isTypingMode = false

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

  const clickInput = () => {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.click();
      searchInput.focus();
      console.log("Input field clicked and focused.");
    } else {
      console.warn("No input field found.");
    }
  };
  // Command actions using refs for scrolling
  const commandActions = {
    // **Scrolling**
    "scroll down": () => startSmoothScroll(1),
    "scroll up": () => startSmoothScroll(-1),
    "stop scrolling": () => stopSmoothScroll(),

    // **Navigation**
    "reload page": () => location.reload(),
    "go to top": () => window.scrollTo({ top: 0, behavior: "smooth" }),
    "go to bottom": () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }),

    // **Typing Mode**
    // "typing": () => {
    //   isTypingMode = true;
    //   console.log("Typing mode activated. Start speaking...");
    // },
    // "stop typing": () => {
    //   isTypingMode = false;
    //   console.log("Typing mode stopped.");
    // },

    // Clicking
    "going": () => {
      clickInput();
    },
  };

  function handleVoiceCommand(command) {

    if(command.includes("typing")){
      isTypingMode = true;
    } else if (command.includes("stop typing")){
      isTypingMode = false;
    } else if (isTypingMode){
      insertTextAtCursor(command);
    }
    for (let key in commandActions) {
      if (command.includes(key)) {
        commandActions[key]();
        return;
      }
    }

    // If typing mode is active, insert spoken text
    // if (isTypingMode) {
    //   insertTextAtCursor(command);
    // } else {
    //   console.log("Command not recognized:", command);
    // }

    if (command.includes("going")) {
      clickInput(); // Auto-focus input field
    }
  }

  // Direction Scrolling with useRef
  function startSmoothScroll(direction) {
    if (isScrollingRef.current) return;
    isScrollingRef.current = true;

    scrollIntervalRef.current = setInterval(() => {
      window.scrollBy({ top: direction * 10, behavior: "smooth" });
    }, 30);
  }

  function stopSmoothScroll() {
    if (!isScrollingRef.current) return;
    clearInterval(scrollIntervalRef.current);
    isScrollingRef.current = false;
  }

  // Insert text at cursor position
  function insertTextAtCursor(text) {
    const activeElement = document.activeElement;
    if (
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable)
    ) {
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
};





