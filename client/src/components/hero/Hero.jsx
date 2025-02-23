import { useState, useEffect } from 'react';
import { GetSpeech } from '../../speech_convert/speech_text';
import './hero.css';

const Hero = () => {
  const [showSpeech, setShowSpeech] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [toggled1, setToggled1] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (toggled) {
      console.log("Mic button toggled on!");
      setShowSpeech(true);
    } else {
      setShowSpeech(false);
    }
  }, [toggled]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='hero'>
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
          <input 
            id="searchInput"
            type="text" 
            placeholder="Type something here..." 
          />
        </div>
      </div>
      {/* Conditionally render GetSpeech */}
      {showSpeech && <GetSpeech />}
    </div>
  );
};

export default Hero