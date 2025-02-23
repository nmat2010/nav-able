import React, { useState } from 'react';
import './navbar.css';
import  {GetSpeech} from '../../speech_convert/speech_text';
import { useHover } from '../../speech_convert/hover_auto_clicking';

const Navbar = () => {
    const [showSpeech, setShowSpeech] = useState(false);

    const handleMicClick = () => {
        console.log("Mic button clicked automatically!");
        setShowSpeech(true);  // Render the GetSpeech component
    };

    const [hoverRef, isHovering] = useHover(handleMicClick, 2000);

    return (
        <>
            <nav className="nav-menu">
                <div>
                    <button>Inspiration</button>  
                </div>
                <div>
                    <button>Home</button>
                </div>
                <div>
                    <button 
                        ref={hoverRef}
                        style={{
                            backgroundColor: isHovering ? "lightblue" : "",
                            border: isHovering ? "2px solid black" : "1px solid gray"
                        }}
                    >
                        Mic
                    </button>
                </div>
            </nav>
            {/* Conditionally render GetSpeech when showSpeech is true */}
            {showSpeech && <GetSpeech />}
        </>
    );
};

export default Navbar;
