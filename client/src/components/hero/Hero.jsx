import './hero.css'
import { useState, useEffect } from 'react'
import {GetSpeech} from '../../speech_convert/speech_text';


const Hero = () => {
    const handleMicClick = () => {
        console.log("Mic button clicked automatically!");  
        GetSpeech(); 
    };
    const [toggled, setToggled] = useState(false);
    const [toggled1, setToggled1] = useState(false);

    useEffect(() => {
        if (toggled) {
          handleMicClick();
        }
      }, [toggled]);

  return (
    <div className='hero'>
        <div className='introduction'>
            <h1>Nav-able</h1>
            <p>This is just a description of the project. It basically tells you what to expect from this project. So far, there is nothing here and I’m typing all these just because we haven’t got a description. This is just a placeholder text and I’m sick of Lorem Ipsum giving me trauma from those 3 years of back pain and strained eyes.</p>
        </div>
        <div className='switchButton'>
            <div className="switch-container">
            <button 

            className={`toggle-btn ${toggled ? 'toggled' : ''}`} onClick={() => setToggled(!toggled)}
            >
                <div className="thumb"></div>
            </button>
            <p>Voice</p>
            </div>
            <div className="switch-container">
            <button className={`toggle-btn ${toggled1 ? 'toggled' : ''}`} onClick={() => setToggled1(!toggled1)}>
                <div className="thumb"></div>
            </button>
            <p>Vision</p>
            </div>
        </div>
        <div className='searchBox'>
            <p>Try out some searching!</p>
            <div className="search-container">
                    <input 
                        type="text" 
                        placeholder="Type something here..." 
                    />
            </div>
        </div>
    </div>
  )
}

export default Hero