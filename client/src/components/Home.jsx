import React, { useState } from "react";
import EyeTracking from "./EyeTracking"; // Import EyeTracking component

const Home = () => {
  const [isEyeTrackingActive, setIsEyeTrackingActive] = useState(false);

  const toggleEyeTracking = () => {
    setIsEyeTrackingActive(!isEyeTrackingActive);
  };

  return (
    <div style={{ position: "relative", height: "100vh", backgroundColor: "#f4f4f4", cursor: isEyeTrackingActive ? "none" : "auto" }}>
      <h1 style={{ textAlign: "center", paddingTop: "20px" }}>Eye Tracking Demo</h1>
      
      {/* Button to toggle Eye Tracking */}
      <div style={{ textAlign: "center", marginTop: "20px", zIndex: 1000 }}>
        <button onClick={toggleEyeTracking}>
          {isEyeTrackingActive ? "Disable Eye Tracking" : "Enable Eye Tracking"}
        </button>
      </div>
      
      {/* Scrollable section */}
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          marginTop: "40px",
          padding: "20px",
          backgroundColor: "#ddd",
          zIndex: 1000, // Ensure it stays on top of the tracking elements
        }}
      >
        <h2>Scroll Section</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan arcu. Nulla ac viverra odio. Phasellus dapibus, nisl in volutpat elementum, eros nunc luctus velit, a ullamcorper felis odio a nisi. Ut at gravida lorem, vel tincidunt magna. Suspendisse potenti. Phasellus mollis velit ut felis placerat, sit amet tincidunt magna interdum.
        </p>
        <p>
          Mauris vitae neque a eros scelerisque dictum. Suspendisse potenti. Proin in sem in lorem interdum gravida. Ut maximus urna in vulputate fermentum. Nulla facilisi. Curabitur id ultricies justo. Aenean feugiat libero ac orci tincidunt, a mollis magna fermentum. Fusce varius pretium ex, in vehicula urna varius non.
        </p>
        <p>
          Etiam tincidunt nunc non tortor efficitur, nec luctus turpis vehicula. Integer sollicitudin, augue a laoreet varius, lacus nisi varius felis, vel maximus purus augue eget mauris. Nunc tincidunt ligula ac venenatis cursus. In sollicitudin dui eget metus lobortis tempus.
        </p>
      </div>

      {/* Button to test Eye Tracking function */}
      <div style={{ textAlign: "center", marginTop: "20px", zIndex: 1000 }}>
        <button
        //   onClick={() => alert("Button clicked!")}
          style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        >
          Test Click Function
        </button>
      </div>

      {/* EyeTracking Component */}
      {isEyeTrackingActive && <EyeTracking  />}
    </div>
  );
};

export default Home;




