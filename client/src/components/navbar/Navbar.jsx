import './navbar.css'
import {GetSpeech} from '../../speech_convert/speech_text';
import {useHover} from '../../speech_convert/hover_auto_clicking';
import {AutoTyping} from '../../speech_convert/typing_auto';
import { useRef } from 'react';

const Navbar = () => {
    const handleMicClick = () => {
        console.log("Mic button clicked automatically!");  
        GetSpeech(); 
    };
    const [hoverRef, isHovering] = useHover(handleMicClick, 2000);


    const handleTypingClick = () => {
        AutoTyping();
    }
    return (
        <nav className="nav-menu">
            <div>
                <button>Inspiration</button>  
            </div>
            <div>
                <button>Home</button>
            </div>
            <div>
                <button 
                    // onClick={handleMicClick}
                    ref={hoverRef}
                    style={{
                        backgroundColor: isHovering ? "lightblue" : "",
                        border: isHovering ? "2px solid black" : "1px solid gray"
                    }}
                >
                    Mic
                </button>
            </div>
            <div className="words"  contentEditable></div>
                <button onClick={handleTypingClick}>Typing</button>
        </nav>
    );
  };

export default Navbar