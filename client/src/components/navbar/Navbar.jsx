import React, { useState } from 'react';
import './navbar.css';
import  {GetSpeech} from '../../speech_convert/speech_text';
import { useHover } from '../../speech_convert/hover_auto_clicking';

const Navbar = () => {

    const [showInspiration, setInspiration] = useState(false); // Track popup visibility
    const [showTeam, setTeam] = useState(false);

    const toggleInspiration = () => {
      setInspiration(!showInspiration);
    };
    const toggleTeam = () => {
        setTeam(!showTeam);
    }

    return (
        <>
            <nav className="nav-menu">
                <div>
                    <button
                    onClick={toggleInspiration}
                    >
                    Inspiration
                    </button>  
                </div>
                <div>
                    <button
                    onClick={toggleTeam}
                    >Team</button>
                </div>
            </nav>
            {showInspiration && (
                <div className="popup-screen">
                <p>Here is some inspiration for you! 🌟</p>
                <button onClick={toggleInspiration} className="close-btn">Close</button>
                </div>
            )}
            {showTeam && (
                <div className="popup-screen">
                <p>Here is some our team for you! 🌟</p>
                <button onClick={toggleTeam} className="close-btn">Close</button>
                </div>
            )}
        </>
    );
};

export default Navbar;
