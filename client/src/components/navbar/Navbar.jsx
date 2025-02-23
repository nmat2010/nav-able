import './navbar.css'
import {GetSpeech} from '../../speech_convert/speech_text';
import {useHover} from '../../speech_convert/hover_auto_clicking';


const Navbar = () => {
    const handleMicClick = () => {
        console.log("Mic button clicked automatically!");  
        GetSpeech(); 
    };
    const [hoverRef, isHovering] = useHover(handleMicClick, 2000);
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
            {/* <div
                ref={hoverRef}
                style={{
                    backgroundColor: isHovering ? 'lightblue' : 'white',
                    padding: '20px',
                    border: '1px solid black',
                }}
                >
                {isHovering ? 'Hovering!' : 'Not hovering.'}
            </div> */}
        </nav>
    );
  };

export default Navbar