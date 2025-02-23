import { useState, useEffect, useRef } from 'react';

export const GetSpeech = ({updateQuery}) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognitionRef = useRef(null);

  // State
  const [text, setText] = useState("");

  // Refs to persist data across renders
  const scrollIntervalRef = useRef(null);
  const isScrollingRef = useRef(false);
  const isTypingModeRef = useRef(false); 
  let lastTranscript = "";
  let timeoutId = null;

  useEffect(() => {
    // Initialize once
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Store it in a ref so we can use it later
    recognitionRef.current = recognition;

    // Set up event handlers
    recognition.onstart = () => {
      console.log("Listening... Say commands like 'scroll up', 'scroll down', or 'open search bar'.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      if (transcript !== lastTranscript) {
        lastTranscript = transcript;
        console.log("You said:", transcript);
        handleVoiceCommand(transcript);
      }

      // Reset after silence
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        console.log("Silence detected, resetting...");
        lastTranscript = "";
      }, 3000);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    // Auto-restart if needed
    recognition.onend = () => {
      console.log("Recognition ended. Restarting...");
      recognition.start();
    };

    // Finally, start listening
    recognition.start();

    // Cleanup on unmount
    return () => {
      recognition.stop();
      recognition.onend = null; // prevent auto-restart loop
    };
  }, []);

  // Voice command handling
  function handleVoiceCommand(command) {
    // Check for typing commands
    if (command.includes("typing")) {
      isTypingModeRef.current = true;
      console.log("Typing mode activated.");
      return;
    } else if (command.includes("finish")) {
      isTypingModeRef.current = false;
      console.log("Typing mode stopped.");
      
      // Update the search query by grabbing the current value from the focused input
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          activeElement.isContentEditable)
      ) {
        const value = activeElement.value || activeElement.innerText;
        updateQuery(value);  // Update the parent's search query
        console.log(`Search query updated to: "${value}"`);
      }
      return;
    } else if (isTypingModeRef.current) {
      insertTextAtCursor(command);
      return;
    }
    if (command.includes("scroll down")) {
      startSmoothScroll(1);
    } else if (command.includes("scroll up")) {
      startSmoothScroll(-1);
    } else if (command.includes("stop")) {
      stopSmoothScroll();
    } else if (command.includes("going")) {
      clickInput();
    }else if (command.includes("go to top")) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Scrolling to the top");
  } else if (command.includes("go to bottom")) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    console.log("Scrolling to the bottom");
  }
    // Add more commands as needed
  }

  // Example: scrolling
  function startSmoothScroll(direction) {
    if (isScrollingRef.current) return;
    isScrollingRef.current = true;
    
    const step = () => {
      if (!isScrollingRef.current) return;
      window.scrollBy({ top: direction * 10, behavior: "smooth" });
      requestAnimationFrame(step);
    };
    
    requestAnimationFrame(step);
  }

  function stopSmoothScroll() {
    if (!isScrollingRef.current) return;
    clearInterval(scrollIntervalRef.current);
    isScrollingRef.current = false;
    // Force-cancel any ongoing smooth scrolling
    window.scrollTo({ top: window.scrollY, behavior: "auto" });
  }

  // Example: clicking the search input
  function clickInput() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.click();
      searchInput.focus();
      console.log("Input field clicked and focused.");
    } else {
      console.warn("No input field found.");
    }
  }

  // Example: typing mode
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

  return null; // or some minimal UI
};