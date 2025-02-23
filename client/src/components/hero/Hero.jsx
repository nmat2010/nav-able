import { useState, useEffect } from 'react';
import { GetSpeech } from '../../speech_convert/speech_text';
import './hero.css';
import EyeTracker from '../../eye_tracker/EyeTracker';
import Search from '../search/Search';

const Hero = () => {

    const [isEyeTrackingActive, setIsEyeTrackingActive] = useState(true);

  const [showSpeech, setShowSpeech] = useState(false);
  const [toggled, setToggled] = useState(true);
  const [toggled1, setToggled1] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (toggled) {
      console.log("Mic button toggled on!");
      setShowSpeech(true);
    } else {
      setShowSpeech(false);
    }
        if (toggled1) {
          setIsEyeTrackingActive(true);
        }
  }, [toggled]);

  const threshold = 1500;
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translateX = scrollPosition > threshold ? scrollPosition -10 : 0;

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
            <img src='/OrbMascot.png' className='mascot'/>
          </div>

          <div className='Bottom-container'>
            <div className='Bottom'>
              <img src='/BigCircle.png' className='bigCircleBottom'/>
              <img src='/Circle Small.png' className='smallCircleBottom'/>
              <img src='/SenseBig.png' className='senseBigBottom'/>
              <img src='/SenseSmall.png' className='senseSmallBtoom'/>
              <img src='/StarLeftDown.png' className='starBottom'/>

              <img src='/wave1.png' className='wave1'/>
              <img src='/wave2.png' className='wave2'/>
              <img src='/wave3.png' className='wave3'/>
              <img src='/wave4.png' className='wave4'/>
            </div>
          </div>
          
        </div>

        <div className='introduction'>
            <h1 className='titleName' style={{transform: `translateX(${scrollPosition * 2}px)`}}>SeeSay</h1>
            <p>Our platform leverages <b>AI-powered gaze detection and voice recognition</b> to empower individuals with disabilities, 
              making technology more accessible and intuitive. With <b>gaze-based navigation</b>, users with limited mobility 
              can interact seamlessly with digital interfaces, while <b>NLP-enhanced voice chat</b> helps interpret speech from 
              those with impaired voices. By bridging these accessibility gaps, we aim to create a more inclusive digital 
              experience where everyone can communicate and navigate with ease.</p>
        </div>
        
        <div className='switchButton'>
        <div className="switch-container">
          <button 
            className={`toggle-btn ${toggled ? 'toggled' : ''}`} 
            onClick={() => setToggled(!toggled)}
          >
            <div className="thumb"></div>
          </button>
          <p>Voice</p>
        </div>
        <div className="switch-container">
          <button 
            className={`toggle-btn ${toggled1 ? 'toggled' : ''}`} 
            onClick={() => setToggled1(!toggled1)}
          >
            <div className="thumb"></div>
          </button>
          <p>Vision</p>
        </div>
      </div>
      <div className='searchBox'>
        <p>Try out some searching!</p>
        <div className="search-container">
          <Search/>
        </div>
      </div>
      {/* Conditionally render GetSpeech */}
      {showSpeech && <GetSpeech />}
      {isEyeTrackingActive && <EyeTracker />}
    </div>
  );
};

export default Hero