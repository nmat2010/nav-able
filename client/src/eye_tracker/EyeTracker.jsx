import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3"; // For the SVG eye tracking visualization

const EyeTracker = () => {

  const svgRef = useRef(null); // Reference for SVG to draw lines and gaze point

  useEffect(() => {
    const loadWebGazerScript = () => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://webgazer.cs.brown.edu/webgazer.js"; // WebGazer script URL
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Dynamically load the WebGazer script
    loadWebGazerScript()
      .then(() => {
        console.log("WebGazer script loaded successfully");
        initWebGazer(); // Initialize WebGazer after script is loaded
      })
      .catch((err) => {
        console.error("Failed to load WebGazer script", err);
      });

    return () => {
      // Cleanup: Remove WebGazer script after component is unmounted
      const script = document.querySelector('script[src="https://webgazer.cs.brown.edu/webgazer.js"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Setup the SVG canvas for gaze visualization
  const setupCollisionSystem = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("position", "fixed")
      .style("top", "0")
      .style("left", "0")
      .style("pointer-events", "none")
      .style("z-index", "20000000000");

    svg.append("line").attr("id", "eyeline1").style("stroke", "red").style("stroke-width", 2);
    svg.append("line").attr("id", "eyeline2").style("stroke", "red").style("stroke-width", 2);
    svg.append("circle").attr("id", "webgazerGazeDot").attr("r", 5).style("fill", "red").style("display", "none");
  };

  // Update the lines and gaze point based on eye positions
  // const updateEyeTracking = (leftEyeX, leftEyeY, rightEyeX, rightEyeY, gazeX, gazeY) => {
  //   // d3.select("#eyeline1").attr("x1", leftEyeX).attr("y1", leftEyeY).attr("x2", gazeX).attr("y2", gazeY);
  //   // d3.select("#eyeline2").attr("x1", rightEyeX).attr("y1", rightEyeY).attr("x2", gazeX).attr("y2", gazeY);
  //   d3.select("#webgazerGazeDot").style("display", "block").attr("cx", gazeX).attr("cy", gazeY);
  // };

  // Listener for WebGazer gaze data
  // const collisionEyeListener = async (data) => {
  //   if (!data) return;

  //   const fmPositions = await window.webgazer.getTracker().getPositions() || [];
  //   if (!fmPositions.length) return;

  //   const whr = window.webgazer.getVideoPreviewToCameraResolutionRatio();
  //   const leftEyeX = fmPositions[145] ? fmPositions[145][0] * whr[0] : 0;
  //   const leftEyeY = fmPositions[145] ? fmPositions[145][1] * whr[1] : 0;
  //   const rightEyeX = fmPositions[374] ? fmPositions[374][0] * whr[0] : 0;
  //   const rightEyeY = fmPositions[374] ? fmPositions[374][1] * whr[1] : 0;

  //   const gazeX = data.x;
  //   const gazeY = data.y;

  //   updateEyeTracking(leftEyeX, leftEyeY, rightEyeX, rightEyeY, gazeX, gazeY);
  // };

  // Handle cursor movement to move the gaze dot
  const handleCursorMovement = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // d3.select("#webgazerGazeDot").style("display", "block").attr("cx", mouseX).attr("cy", mouseY);

    if (mouseY < 50) {
      window.scrollBy(0, -10); // Scroll up
    } else if (mouseY > window.innerHeight - 50) {
      window.scrollBy(0, 10); // Scroll down
    }

    const element = document.elementFromPoint(mouseX, mouseY);
    if (element && (element.tagName === "BUTTON" || element.tagName === "A")) {
      element.click();
    }
  };

  // Initialize WebGazer when the script is ready
  const initWebGazer = async () => {
    if (!window.webgazer) {
      console.warn("WebGazer not loaded");
      return;
    }

    try {
      await window.webgazer.setRegression("ridge").setTracker("TFFacemesh").begin();
      window.webgazer
        .showVideoPreview(true)
        .showPredictionPoints(false)
        .applyKalmanFilter(true);
        // .setGazeListener(collisionEyeListener);

        window.webgazer.clearGazeListener();

        // Resize the video preview (example: 30% of the screen width and height)
        const videoPreview = document.querySelector('.webgazer-video-preview'); // or use another selector if needed
        if (videoPreview) {
        videoPreview.style.width = '5%';
        videoPreview.style.height = '5%';
        videoPreview.style.bottom = '10px';  // Position it if you want it to be at the top-left corner
        videoPreview.style.left = '10px';
        videoPreview.style.zIndex="9999999999";
        videoPreview.style.position = 'absolute';
        }

      console.log("WebGazer initialized");

      // Check if the camera is ready, and then trigger a page reload if needed
      const checkCameraReady = setInterval(() => {
        if (window.webgazer.isReady()) {
          clearInterval(checkCameraReady);
          console.log("Camera is ready!");
        //   setShouldReload(true); // Trigger reload once the camera is ready
        }
      }, 1000); // Check every 1 second
    } catch (error) {
      console.error("Error initializing WebGazer:", error);
    }

    setupCollisionSystem();
    window.addEventListener("mousemove", handleCursorMovement);
  };

  // Reload the page when WebGazer is ready

  return (
    <div>
      <div ref={svgRef} />
    </div>
  );
};

export default EyeTracker;