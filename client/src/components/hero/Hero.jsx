import './hero.css'
import { useState, useEffect } from 'react'
import {GetSpeech} from '../../speech_convert/speech_text';
import EyeTracker from '../../eye_tracker/EyeTracker';

const Hero = () => {

    const [isEyeTrackingActive, setIsEyeTrackingActive] = useState(true);

    const handleMicClick = () => {
        console.log("Mic button clicked automatically!");  
        GetSpeech(); 
    };
    const [toggled, setToggled] = useState(true);
    const [toggled1, setToggled1] = useState(true);

    useEffect(() => {
        if (toggled) {
          handleMicClick();
        }
        if (toggled1) {
          setIsEyeTrackingActive(true);
        }
      }, [toggled]);

  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='hero' style={{cursor: isEyeTrackingActive ? "none" : "auto"}}>
        <div className='background'>
          <div className='SideLeftTop'>
            <img src='/BigLeaveLight.png' className='bigLeaveLight1'/>
            <img src='/SmallLeaveDark.png' className='smallLeaveDark1'/>
            <img src='/BigCircle.png' className='bigCircle1'/>
            <img src='/Circle Small.png' className='smallCircle1'/>
            <img src='/SenseBig.png' className='senseBig2'/>
            <img src='/SenseSmall.png' className='senseSmall1'/>
            <img src='/StarLeftSide.png' className='starLeftSide'/>
          </div>

          <div className='SideRightTop'>
            <img src='/BigLeaveDark.png' className='bigLeaveDark'/>
            <img src='/SenseSmall.png' className='senseSmall2'/>
            <img src='/StarUpperRight.png' className='starRightSide'/>
          </div>

          <div className='Bottom-container'>
            <div className='Bottom'>
              <img src='/BigCircle.png' className='bigCircleBottom'/>
              <img src='/Circle Small.png' className='smallCircleBottom'/>
              <img src='/SenseBig.png' className='senseBigBottom'/>
              <img src='/SenseSmall.png' className='senseSmallBtoom'/>
              <img src='/StarLeftDown.png' className='starBottom'/>
            </div>
          </div>
          
        </div>

        <div className='introduction'>
            <h1 className='titleName' style={{transform: `translateX(${scrollPosition * 2}px)`}}>Nav-able</h1>
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
        {isEyeTrackingActive && <EyeTracker />}
    </div>
  )
}

export default Hero